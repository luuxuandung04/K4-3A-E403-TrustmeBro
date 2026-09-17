# coding: utf-8
"""
GOLDEN SET V2 — Bo do kiem that mo hinh that (Discord pipeline).
35 ca test danh thang pipeline: filter_and_route -> extract_semantics -> validator.
Ban cu (25 ca Q&A) giu nguyen lam ho so lich su, KHONG DUNG TOI.

=====================================================================
QUALITY BAR — KHOA TU CP4, CAM SUA (spec: HACKATHON_MASTER_GUIDE.md)
  Dat khi: >= 85% ca vuot qua Golden Set VA 0% ca bia/sai deadline.
  Voi 35 ca: toi thieu 30/35 PASS, dong thoi hallucination_cases == 0.
KHONG NANG BAR LEN 95%. KHONG SUA GOLDEN SET DE LAM DEP SO LIEU.
=====================================================================
"""
import hashlib
import json
import os
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

# =====================================================================
# QUALITY BAR — KHOA TU CP4, CAM SUA
# =====================================================================
QUALITY_BAR_PASS_RATE = 85.0      # >= 85% ca PASS  (~ voi 35 ca: >= 30 ca)
QUALITY_BAR_HALLUCINATION = 0.0   # 0% ca bia hoac sai deadline (bat buoc = 0)

# Moc thoi gian co dinh de quy doi "ngay mai", "tuan sau" (khoa theo bo de)
EVAL_CURRENT_DATETIME = "2026-09-17T14:00:00+07:00"
EVAL_TIMEZONE = "Asia/Ho_Chi_Minh"

EVAL_DIR = Path(__file__).resolve().parent
GOLDEN_SET_V2_FILE = EVAL_DIR / "golden_set_v2.json"
RESULTS_V2_FILE = EVAL_DIR / "run_results_v2.md"


def sha256_of_file(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def load_cases() -> List[Dict[str, Any]]:
    with open(GOLDEN_SET_V2_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
    seeds = [c for c in data if c.get("role") == "seed"]
    tests = [c for c in data if c.get("role") == "test"]
    # Seed luon chay truoc de tao ngu canh cho chuoi L6
    return seeds + tests


def norm_dt(value: Optional[str]) -> Optional[str]:
    """Chuan hoa ISO datetime ve dang 'YYYY-MM-DDTHH:MM' (bo giay + mui gio).
    Tra None neu khong phai datetime hop le."""
    if value is None:
        return None
    try:
        text = str(value).strip().replace("Z", "+00:00")
        dt = datetime.fromisoformat(text)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt.strftime("%Y-%m-%dT%H:%M")
    except Exception:
        return None


def check_schedule(gold: Optional[Dict[str, Any]], actual: Optional[Any]) -> Tuple[bool, List[str], bool]:
    """So sanh schedule. Tra (ok, loi, is_hallucination).
    - Chia nho 3 truong rieng: deadline bi chenh = bia/sai deadline (hallu).
    - start_time / end_time / precision sai = loi do chinh xac (khong tinh hallu).
    """
    if gold is None:
        return True, [], False
    errors: List[str] = []
    hallu = False

    gold_dl = norm_dt(gold.get("deadline"))
    act_dl = norm_dt(getattr(actual, "deadline", None))
    if gold_dl is None:
        if act_dl is not None:
            errors.append(f"BIA deadline: mong cho null, model tra {act_dl}")
            hallu = True
    else:
        if act_dl is None:
            errors.append(f"MAT deadline: mong cho {gold_dl}, model tra null")
        elif act_dl != gold_dl:
            errors.append(f"SAI deadline: mong cho {gold_dl}, model tra {act_dl}")
            hallu = True

    gold_st = norm_dt(gold.get("start_time"))
    act_st = norm_dt(getattr(actual, "start_time", None))
    if gold_st != act_st:
        errors.append(f"Sai start_time: mong cho {gold_st}, model tra {act_st}")

    act_et = norm_dt(getattr(actual, "end_time", None))
    if gold.get("end_time") is None and act_et is not None:
        errors.append(f"Bia end_time: mong cho null, model tra {act_et}")

    gold_prec = gold.get("time_precision")
    act_prec = getattr(actual, "time_precision", None)
    if gold_prec is not None and act_prec != gold_prec:
        errors.append(f"Sai time_precision: mong cho {gold_prec}, model tra {act_prec}")

    return (len(errors) == 0), errors, hallu


def check_classification(gold: Optional[Dict[str, Any]], actual: Optional[Any]) -> Tuple[bool, List[str]]:
    if gold is None:
        return True, []
    errors: List[str] = []
    exp_type = gold.get("type")
    if exp_type is not None and getattr(actual, "type", None) != exp_type:
        errors.append(f"Sai type: mong cho {exp_type}, model tra {getattr(actual, 'type', None)}")
    exp_imp = gold.get("importance")
    if exp_imp is not None and getattr(actual, "importance", None) != exp_imp:
        errors.append(f"Sai importance: mong cho {exp_imp}, model tra {getattr(actual, 'importance', None)}")
    if gold.get("is_relevant") is True and getattr(actual, "is_relevant", None) is not True:
        errors.append("Model danh dau is_relevant=False trong khi tin co gia tri")
    return (len(errors) == 0), errors


def run_evaluation() -> Dict[str, Any]:
    import backend.db.json_store as json_store_module
    from backend.db.json_store import JsonStore
    from backend.models.discord_raw import DiscordRawEvent, RawMessageData, RawAuthor
    from backend.services.filter_router import filter_and_route
    from backend.services import ai_extractor as ai_extractor_module
    from backend.services.validator import validate_and_create_document, get_assignment_topic

    golden_sha = sha256_of_file(GOLDEN_SET_V2_FILE)
    cases = load_cases()
    tests = [c for c in cases if c.get("role") == "test"]
    total = len(tests)

    # --- Cach ly store: dung file tam, giu nguyen data/ ---
    tmp_events = tempfile.NamedTemporaryFile("w", suffix=".json", delete=False, encoding="utf-8")
    tmp_events.write("[]")
    tmp_events.close()
    tmp_deadlines = Path(tmp_events.name).with_suffix(".deadlines.json")
    tmp_deadlines.write_text("[]", encoding="utf-8")
    store = JsonStore(filepath=Path(tmp_events.name))
    old_singleton = json_store_module._store_instance
    old_events_file = json_store_module.EVENTS_FILE
    old_deadlines_file = json_store_module.DEADLINES_FILE
    json_store_module._store_instance = store
    json_store_module.EVENTS_FILE = Path(tmp_events.name)
    json_store_module.DEADLINES_FILE = tmp_deadlines

    engine_used = "gemini" if os.getenv("GEMINI_API_KEY", "") else "deterministic-fallback"
    passed = 0
    hallu_ids: List[str] = []
    layer_stats: Dict[str, Dict[str, int]] = {}
    details: List[Dict[str, Any]] = []

    def bump(layer: str, ok: bool):
        st = layer_stats.setdefault(layer, {"total": 0, "passed": 0, "failed": 0})
        st["total"] += 1
        st["passed" if ok else "failed"] += 1

    print(f"=== GOLDEN SET V2: {total} ca test tren pipeline that ({engine_used}) ===")
    print(f"Golden SHA-256: {golden_sha[:16]}...")
    print(f"Moc thoi gian khoa: {EVAL_CURRENT_DATETIME} ({EVAL_TIMEZONE})")

    for case in cases:
        c_id = case["id"]
        msg = case["input_message"]
        raw = DiscordRawEvent(
            t="MESSAGE_CREATE",
            d=RawMessageData(
                id=msg["message_id"],
                guild_id=msg.get("guild_id", "123456789012345678"),
                channel_id=msg["channel_id"],
                author=RawAuthor(id=msg["author"]["id"], username=msg["author"]["name"]),
                content=msg["content"],
                timestamp=msg.get("timestamp", "2026-09-17T07:00:00.000Z"),
                mention_everyone=bool(msg.get("mention_everyone", False)),
            ),
        )

        try:
            ok_filter, _reason, ai_in = filter_and_route(raw)
        except Exception as exc:  # noqa: BLE001
            ok_filter, ai_in = False, None
            print(f"[LOI FILTER] {c_id}: {exc}")

        if case.get("role") == "seed":
            # Seed: chi chay pipeline de tao ngu canh, khong cham diem
            if ok_filter and ai_in is not None:
                try:
                    ai_in.context.current_datetime = EVAL_CURRENT_DATETIME
                    ai_in.context.timezone = EVAL_TIMEZONE
                    ai_out = ai_extractor_module.extract_semantics(ai_in)
                    validate_and_create_document(ai_in, ai_out)
                except Exception as exc:  # noqa: BLE001
                    print(f"[LOI SEED] {c_id}: {exc}")
            continue

        layer = case.get("difficulty_layer", "Chua phan lop")
        errors: List[str] = []
        is_hallu = False
        ai_out = None
        doc = None

        expect_pass = bool(case.get("expect_filter_pass", True))
        if ok_filter != expect_pass:
            errors.append(
                f"Sai filter: mong cho {'PASS' if expect_pass else 'LOC'}, "
                f"thuc te {'PASS' if ok_filter else 'LOC'}"
            )

        if expect_pass and ok_filter and ai_in is not None:
            try:
                ai_in.context.current_datetime = EVAL_CURRENT_DATETIME
                ai_in.context.timezone = EVAL_TIMEZONE
                ai_out = ai_extractor_module.extract_semantics(ai_in)
            except Exception as exc:  # noqa: BLE001
                errors.append(f"Loi AI extractor: {exc}")

            if ai_out is not None:
                accepted = [case.get("expected_classification", {}).get("type")] if case.get("expected_classification") else []
                alt = case.get("accept_type") or []
                if isinstance(alt, str):
                    alt = [alt]
                accepted = [t for t in (accepted + alt) if t]
                if accepted and ai_out.classification.type not in accepted:
                    errors.append(
                        f"Sai type: chap nhan {accepted}, model tra {ai_out.classification.type}"
                    )
                else:
                    _ok, cls_err = check_classification({"importance": (case.get("expected_classification") or {}).get("importance"), "is_relevant": True}, ai_out.classification)
                    # Chi cham importance, bo qua type vi da cham mem o tren
                    errors.extend([e for e in cls_err if e.startswith("Sai importance") or "is_relevant" in e])

                sch_ok, sch_err, sch_hallu = check_schedule(case.get("expected_schedule"), ai_out.schedule)
                errors.extend(sch_err)
                if sch_hallu:
                    is_hallu = True

                exp_topic = case.get("expected_topic_key")
                if exp_topic is not None:
                    got_topic = get_assignment_topic(ai_out.content.title, ai_out.content.summary)
                    if got_topic != exp_topic:
                        errors.append(f"Sai topic_key: mong cho {exp_topic}, model ra {got_topic}")

                try:
                    valid, _v_reason, doc = validate_and_create_document(ai_in, ai_out)
                except Exception as exc:  # noqa: BLE001
                    valid, doc = False, None
                    errors.append(f"Loi validator: {exc}")

                outcome = case.get("expected_outcome")
                if valid and doc is not None:
                    sched = doc.schedule
                    has_dl = sched.deadline is not None
                    if outcome == "PROCESSED_WITH_DEADLINE" and not has_dl:
                        errors.append("Validator loai mat deadline cua tin co moc")
                    elif outcome == "MEETING_NO_DEADLINE":
                        if has_dl:
                            errors.append(f"Doc meeting van co deadline {sched.deadline}")
                            is_hallu = True
                        if sched.start_time is None:
                            errors.append("Doc meeting thieu start_time")
                    elif outcome == "RELEVANT_NO_TIME":
                        if has_dl:
                            errors.append(f"Tin chua co gio nhung doc co deadline {sched.deadline}")
                            is_hallu = True
                elif outcome in ("PROCESSED_WITH_DEADLINE", "MEETING_NO_DEADLINE", "RELEVANT_NO_TIME"):
                    errors.append("Validator tu choi luu tin dang le phai luu")
            else:
                errors.append("Khong co AI output de cham")

        # Kiem tra tac dung phu chuoi L6 (supersede / giu nguyen)
        side = case.get("expected_side_effects") or {}
        if side:
            for key, ref_case_id in side.items():
                ref_msg = next((c["input_message"]["message_id"] for c in cases if c["id"] == ref_case_id), None)
                ref_doc = store.get_by_id(f"evt_{ref_msg}") if ref_msg else None
                if ref_doc is None:
                    errors.append(f"Side-effect {key}: khong tim thay doc cua {ref_case_id}")
                    continue
                status = ref_doc.system.status
                if key == "super_seed" and status != "SUPERSEDED":
                    errors.append(f"Side-effect: {ref_case_id} phai SUPERSEDED, thuc te {status}")
                if key in ("keep_seed_processed", "keep_latest_processed") and status != "PROCESSED":
                    errors.append(f"Side-effect: {ref_case_id} phai giu PROCESSED, thuc te {status}")

        ok = len(errors) == 0
        if ok:
            passed += 1
            print(f"[PASS] {c_id} [{layer}]")
        else:
            print(f"[FAIL] {c_id} [{layer}] :: {'; '.join(errors)}")
        if is_hallu:
            hallu_ids.append(c_id)
        bump(layer, ok)
        details.append({
            "id": c_id, "layer": layer, "category": case.get("category", ""),
            "question": msg["content"][:160], "expected_outcome": case.get("expected_outcome", ""),
            "status": "PASS" if ok else "FAIL", "errors": errors, "hallucination": is_hallu,
            "actual_type": getattr(getattr(ai_out, "classification", None), "type", None),
            "actual_deadline": getattr(getattr(ai_out, "schedule", None), "deadline", None),
        })

    # --- Khoi phuc store goc, xoa file tam ---
    json_store_module._store_instance = old_singleton
    json_store_module.EVENTS_FILE = old_events_file
    json_store_module.DEADLINES_FILE = old_deadlines_file
    try:
        os.unlink(tmp_events.name)
        if tmp_deadlines.exists():
            os.unlink(tmp_deadlines)
    except Exception:
        pass

    acc = (passed / total * 100) if total else 0.0
    hallu_count = len(hallu_ids)
    hallu_rate = (hallu_count / total * 100) if total else 0.0
    bar_pass_ok = acc >= QUALITY_BAR_PASS_RATE
    bar_hallu_ok = hallu_rate <= QUALITY_BAR_HALLUCINATION
    verdict = "DAT" if (bar_pass_ok and bar_hallu_ok) else "KHONG DAT"

    print("=" * 64)
    print("TONG KET GOLDEN SET V2:")
    print(f"- Tong ca: {total} | PASS: {passed} | FAIL: {total - passed}")
    print(f"- Ti le dat: {acc:.2f}% (Bar CP4: >= {QUALITY_BAR_PASS_RATE:.1f}%) -> {'OK' if bar_pass_ok else 'ROT'}")
    print(f"- Ca bia/sai deadline: {hallu_count} ({hallu_rate:.2f}%) (Bar CP4: = {QUALITY_BAR_HALLUCINATION:.1f}%) -> {'OK' if bar_hallu_ok else 'ROT'}")
    print(f"- KET LUAN: {verdict}")
    print("=" * 64)

    return {
        "golden_sha": golden_sha, "engine": engine_used, "total": total,
        "passed": passed, "failed": total - passed, "accuracy": acc,
        "hallu_count": hallu_count, "hallu_rate": hallu_rate,
        "hallu_ids": hallu_ids, "verdict": verdict,
        "layer_stats": layer_stats, "details": details,
    }


def write_report(res: Dict[str, Any]) -> None:
    from datetime import datetime as _dt
    now = _dt.now().strftime("%Y-%m-%d %H:%M:%S")
    L: List[str] = []
    L.append("# Bao Cao Golden Set V2 — Do Mo Hinh That (Discord Pipeline)")
    L.append(f"**Thoi gian thuc thi:** {now} (Asia/Ho_Chi_Minh)")
    L.append(f"**Bo de:** `eval/golden_set_v2.json` — {res['total']} ca test + 2 seed tao ngu canh")
    L.append(f"**SHA-256 bo de (chong sua de lam dep so lieu):** `{res['golden_sha']}`")
    L.append(f"**Engine:** {res['engine']} | **Moc thoi gian khoa:** {EVAL_CURRENT_DATETIME}")
    L.append("")
    L.append("> Quality Bar KHOA TU CP4: Dat khi >= 85% ca vuot qua Golden Set VA 0% ca bia/sai deadline. Khong nang bar. Khong sua de.")
    L.append("")
    L.append("---")
    L.append("")
    L.append("## 1. Tong quan vs Quality Bar CP4")
    L.append("")
    L.append("| Chi so | Bar CP4 (khoa) | Ket qua | Danh gia |")
    L.append("| :--- | :---: | :---: | :---: |")
    pass_ok = res["accuracy"] >= QUALITY_BAR_PASS_RATE
    hallu_ok = res["hallu_rate"] <= QUALITY_BAR_HALLUCINATION
    L.append(f"| Tong ca | 35 ca | **{res['total']} ca** | {'Du bo de' if res['total'] == 35 else 'THIEU/SAI SO CA'} |")
    L.append(f"| So ca PASS | >= 30 ca | **{res['passed']} ca** | {'OK' if pass_ok else 'ROT'} |")
    L.append(f"| Ti le dat | >= 85.0% | **{res['accuracy']:.2f}%** | {'Dat' if pass_ok else 'Khong dat'} |")
    L.append(f"| Ca bia/sai deadline | 0 ca (0.0%) | **{res['hallu_count']} ca ({res['hallu_rate']:.2f}%)** | {'Dat' if hallu_ok else 'VI PHAM'} |")
    L.append(f"| **KET LUAN** | | **{res['verdict']}** | |")
    if res["hallu_ids"]:
        L.append("")
        L.append(f"Danh sach ca bia/sai deadline: {', '.join(res['hallu_ids'])}")
    L.append("")
    L.append("---")
    L.append("")
    L.append("## 2. Theo lop do kho")
    L.append("")
    L.append("| Lop | So ca | PASS | Ti le |")
    L.append("| :--- | :---: | :---: | :---: |")
    for layer, st in res["layer_stats"].items():
        pct = (st["passed"] / st["total"] * 100) if st["total"] else 0.0
        L.append(f"| {layer} | {st['total']} | {st['passed']}/{st['total']} | {pct:.1f}% |")
    L.append("")
    L.append("---")
    L.append("")
    L.append("## 3. Chi tiet 35 ca")
    L.append("")
    L.append("| ID | Lop | Phan loai | Ky vong | Thuc te | Trang thai | Loi |")
    L.append("| :-: | :--- | :--- | :--- | :--- | :--- | :--- |")
    for d in res["details"]:
        badge = "PASS" if d["status"] == "PASS" else "FAIL"
        if d["hallucination"]:
            badge += " + BIA/SAI DEADLINE"
        q = str(d["question"]).replace("|", "/").replace("\n", " ")
        exp = d["expected_outcome"]
        act = f"{d['actual_type'] or '-'} / {d['actual_deadline'] or '-'}"
        errs = "; ".join(d["errors"])[:220].replace("|", "/")
        L.append(f"| {d['id']} | {d['layer']} | {d['category']} | {exp} | {act} | **{badge}** | {errs} |")
    L.append("")
    L.append("---")
    L.append("")
    L.append("## 4. Ghi chu van hanh")
    L.append("- Bo de cu `eval/golden_set.json` (25 ca Q&A) giu nguyen lam ho so, khong dung toi.")
    L.append("- Moi luot chay phai ghi lai SHA-256 o tren; SHA doi nghia la bo de da bi sua sau khi khoa.")
    L.append("- Chay offline (khong key) chi do fallback; luot do CP4 chinh thuc phai chay engine gemini.")
    with open(RESULTS_V2_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(L))
    print(f"\nDa xuat bao cao: {RESULTS_V2_FILE}")


if __name__ == "__main__":
    result = run_evaluation()
    write_report(result)
