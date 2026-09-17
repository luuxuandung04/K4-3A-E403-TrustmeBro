# coding: utf-8
import os
from datetime import datetime
from typing import List, Dict, Any, Optional
import pytz
from backend.config import LOGS_DIR, LOG_FILE, DEFAULT_TIMEZONE

# Ensure logs directory exists
LOGS_DIR.mkdir(parents=True, exist_ok=True)

# In-memory circular buffer for fast Web UI access
_RECENT_LOGS: List[str] = []
_MAX_BUFFER = 500

def _get_timestamp() -> str:
    tz = pytz.timezone(DEFAULT_TIMEZONE)
    return datetime.now(tz).strftime("%Y-%m-%d %H:%M:%S")

def write_log(stage: str, level: str, message: str, meta: Optional[Dict[str, Any]] = None) -> str:
    """
    Writes a structured, standardized log line to logs/pipeline.log and stdout.
    Format: [YYYY-MM-DD HH:MM:SS] [LEVEL] [STAGE] message | details
    """
    ts = _get_timestamp()
    meta_str = ""
    if meta:
        meta_pairs = [f"{k}={v}" for k, v in meta.items() if v is not None]
        if meta_pairs:
            meta_str = " | " + " · ".join(meta_pairs)

    line = f"[{ts}] [{level:<5}] [{stage}] {message}{meta_str}"

    # 1. Print to console safely on Windows
    try:
        print(line)
    except (UnicodeEncodeError, OSError):
        try:
            print(line.encode("ascii", errors="replace").decode("ascii"))
        except Exception:
            pass

    # 2. Add to in-memory buffer
    _RECENT_LOGS.append(line)
    if len(_RECENT_LOGS) > _MAX_BUFFER:
        _RECENT_LOGS.pop(0)

    # 3. Append to file atomically
    try:
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(line + "\n")
    except Exception as e:
        print(f"[LOGGER ERROR] Không thể ghi log vào {LOG_FILE}: {e}")

    return line

def log_event_received(channel_id: str, author_name: str, msg_id: str, content: str):
    preview = content.replace("\n", " ")[:65]
    if len(content) > 65:
        preview += "..."
    write_log(
        stage="DISCORD_EVENT",
        level="INFO",
        message=f"Nhận tin nhắn mới từ #{channel_id}",
        meta={"Author": author_name, "MsgID": msg_id, "Preview": f'"{preview}"'}
    )

def log_candidate_gate(passed: bool, reason: str, author_name: str, channel_name: str):
    status = "CHẤP NHẬN (Tiến hành phân tích AI)" if passed else "BỎ QUA (Không liên quan sự kiện/deadline)"
    write_log(
        stage="CANDIDATE_GATE",
        level="INFO" if passed else "DEBUG",
        message=f"{status}",
        meta={"Author": author_name, "Channel": f"#{channel_name}", "Reason": reason}
    )

def log_ai_extraction(engine: str, model: str, classification: str, title: str, schedule: dict, confidence: float):
    schedule_summary = []
    if schedule.get("start_time"):
        schedule_summary.append(f"start={schedule['start_time']}")
    if schedule.get("deadline"):
        schedule_summary.append(f"deadline={schedule['deadline']}")
    if schedule.get("end_time"):
        schedule_summary.append(f"end={schedule['end_time']}")
    sched_str = ", ".join(schedule_summary) or "no_explicit_time"

    write_log(
        stage="AI_EXTRACTOR",
        level="INFO",
        message=f'Trích xuất: Type={classification} · Title="{title}"',
        meta={"Engine": engine, "Model": model, "Time": sched_str, "Confidence": f"{int(confidence*100)}%"}
    )

def log_validation(is_valid: bool, reason: str, doc_id: Optional[str], conflict_detected: bool, conflict_note: Optional[str] = None):
    if conflict_detected:
        write_log(
            stage="VALIDATOR",
            level="WARN",
            message="Phát hiện xung đột mốc nộp! Gắn cờ CONFLICT",
            meta={"DocID": doc_id, "ConflictNote": conflict_note}
        )
    elif is_valid:
        write_log(
            stage="VALIDATOR",
            level="INFO",
            message="Xác thực hợp lệ (Document Schema đạt chuẩn)",
            meta={"DocID": doc_id, "Status": "VALID"}
        )
    else:
        write_log(
            stage="VALIDATOR",
            level="WARN",
            message=f"Từ chối lưu document: {reason}",
            meta={"DocID": doc_id}
        )

def log_storage(doc_id: str, total_count: int, file_path: str):
    write_log(
        stage="JSON_STORE",
        level="INFO",
        message="Lưu thành công Document vào kho JSON",
        meta={"DocID": doc_id, "TotalEvents": total_count, "File": os.path.basename(file_path)}
    )

def log_discord_payload(target_channel: str, action: str, details: str = ""):
    write_log(
        stage="DISCORD_FORMAT",
        level="INFO",
        message=f"Sinh payload giao diện cho #{target_channel}",
        meta={"Action": action, "Details": details}
    )

def get_recent_logs(limit: int = 100) -> List[str]:
    """Returns the most recent log lines from memory or disk"""
    if _RECENT_LOGS:
        return _RECENT_LOGS[-limit:]
    
    if LOG_FILE.exists():
        try:
            with open(LOG_FILE, "r", encoding="utf-8") as f:
                lines = [l.strip() for l in f.readlines() if l.strip()]
                return lines[-limit:]
        except Exception:
            return []
    return []

def init_log_file():
    if not LOG_FILE.exists() or LOG_FILE.stat().st_size == 0:
        header = (
            f"# =====================================================================\n"
            f"# DISCORD DEADLINE & LOGISTICS GUARD - PIPELINE AUDIT LOG\n"
            f"# Standardized Pipeline Execution Log (Timezone: {DEFAULT_TIMEZONE})\n"
            f"# Stages: [DISCORD_EVENT] -> [CANDIDATE_GATE] -> [AI_EXTRACTOR] -> [VALIDATOR] -> [JSON_STORE] -> [DISCORD_FORMAT]\n"
            f"# =====================================================================\n"
        )
        try:
            with open(LOG_FILE, "w", encoding="utf-8") as f:
                f.write(header)
        except Exception:
            pass

init_log_file()
