# coding: utf-8
import json
import os
import tempfile
from pathlib import Path
from typing import List, Optional, Dict, Any, Callable
from backend.config import DATA_DIR, EVENTS_FILE, DEADLINES_FILE
from backend.models.event_doc import EventDocument

def _atomic_json_write(filepath: Path, data: Any) -> None:
    filepath = Path(filepath)
    parent_dir = filepath.parent
    parent_dir.mkdir(parents=True, exist_ok=True)
    temp_path = filepath.with_suffix(".tmp")
    try:
        with open(temp_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        os.replace(temp_path, filepath)
    except Exception:
        if temp_path.exists():
            try:
                temp_path.unlink()
            except Exception:
                pass
        raise

class JsonStore:
    def __init__(self, filepath: Path = EVENTS_FILE):
        self.filepath = Path(filepath)
        self._ensure_file()

    def _ensure_file(self):
        self.filepath.parent.mkdir(parents=True, exist_ok=True)
        if not self.filepath.exists():
            # Initial seed from existing deadlines or empty list
            initial_events = self._load_initial_seed()
            self._write_raw(initial_events)

    def _load_initial_seed(self) -> List[Dict[str, Any]]:
        """Seed initial events from data/deadlines.json if available to bootstrap the system"""
        if DEADLINES_FILE.exists():
            try:
                with open(DEADLINES_FILE, "r", encoding="utf-8") as f:
                    deadlines = json.load(f)
                seeded = []
                for d in deadlines:
                    seeded.append({
                        "_id": f"evt_{d.get('id', 'item')}",
                        "source": {
                            "guild_id": "123456789012345678",
                            "channel_id": "chan_announcements",
                            "channel_name": d.get("source_channel", "#announcements").replace("#", ""),
                            "message_id": d.get("source_message_id", "msg_seed"),
                            "message_url": f"https://discord.com/channels/123456789012345678/chan_announcements/{d.get('source_message_id', 'msg_seed')}",
                            "author": {
                                "id": "1029384756",
                                "name": d.get("author_name", "Thầy Hoàng")
                            },
                            "created_at": d.get("updated_at", "2026-09-15T14:00:00+07:00")
                        },
                        "classification": {
                            "type": "DEADLINE",
                            "importance": "HIGH" if d.get("is_important") else "NORMAL",
                            "is_relevant": True,
                            "confidence": d.get("confidence", 95) / 100.0 if d.get("confidence", 95) > 1 else d.get("confidence", 0.95)
                        },
                        "content": {
                            "title": d.get("title", ""),
                            "summary": d.get("quote", "")
                        },
                        "schedule": {
                            "start_time": None,
                            "end_time": None,
                            "deadline": d.get("iso_deadline", f"{d.get('due_date')}T{d.get('due_time')}:00+07:00"),
                            "time_precision": "DEADLINE_ONLY"
                        },
                        "target": {
                            "audience": "UNKNOWN",
                            "course": "AI Batch 04"
                        },
                        "system": {
                            "status": "PROCESSED",
                            "created_at": d.get("updated_at", "2026-09-15T14:00:00+07:00"),
                            "updated_at": d.get("updated_at", "2026-09-15T14:00:00+07:00"),
                            "conflict_detected": False,
                            "conflict_note": None
                        }
                    })
                return seeded
            except Exception:
                return []
        return []

    def _read_raw(self) -> List[Dict[str, Any]]:
        if not self.filepath.exists():
            return []
        try:
            with open(self.filepath, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []

    def _write_raw(self, data: List[Dict[str, Any]]):
        _atomic_json_write(self.filepath, data)

    def list_all(self, filter_fn: Optional[Callable[[EventDocument], bool]] = None) -> List[EventDocument]:
        raw_items = self._read_raw()
        docs = []
        for item in raw_items:
            try:
                doc = EventDocument.model_validate(item)
                if filter_fn is None or filter_fn(doc):
                    docs.append(doc)
            except Exception as e:
                continue
        return docs

    def get_by_id(self, event_id: str) -> Optional[EventDocument]:
        raw_items = self._read_raw()
        for item in raw_items:
            if item.get("_id") == event_id or item.get("id") == event_id:
                return EventDocument.model_validate(item)
        return None

    def insert(self, doc: EventDocument) -> EventDocument:
        raw_items = self._read_raw()
        doc_dict = doc.model_dump(by_alias=True)

        # Dedup by topic_key: auto-SUPERSEDE older docs with same topic
        topic_key = doc.system.topic_key
        if topic_key:
            for item in raw_items:
                item_topic = item.get("system", {}).get("topic_key")
                item_id = item.get("_id", "")
                item_status = item.get("system", {}).get("status", "")
                if (item_topic == topic_key
                        and item_id != doc.id
                        and item_status not in ("SUPERSEDED", "CANCELLED")):
                    item["system"]["status"] = "SUPERSEDED"
                    item["system"]["conflict_note"] = (
                        f"Đã được thay thế bởi {doc.id} (topic: {topic_key})"
                    )

        # Update if same _id exists, else append
        existing_idx = None
        for i, item in enumerate(raw_items):
            if item.get("_id") == doc.id:
                existing_idx = i
                break
        if existing_idx is not None:
            raw_items[existing_idx] = doc_dict
        else:
            raw_items.append(doc_dict)
        self._write_raw(raw_items)
        self.sync_deadlines_view()
        return doc

    def update(self, event_id: str, patch: Dict[str, Any]) -> Optional[EventDocument]:
        raw_items = self._read_raw()
        target_idx = None
        for i, item in enumerate(raw_items):
            if item.get("_id") == event_id or item.get("id") == event_id:
                target_idx = i
                break
        if target_idx is None:
            return None
        raw_items[target_idx].update(patch)
        self._write_raw(raw_items)
        self.sync_deadlines_view()
        return EventDocument.model_validate(raw_items[target_idx])

    def sync_deadlines_view(self):
        """Maintains backward-compatibility with existing data/deadlines.json for frontend views"""
        raw_items = self._read_raw()
        by_topic = {}
        for item in raw_items:
            # Skip superseded historical records
            if item.get("system", {}).get("status") == "SUPERSEDED":
                continue
            classification = item.get("classification", {})
            schedule = item.get("schedule", {})
            source = item.get("source", {})
            content = item.get("content", {})
            title = content.get("title", "")
            summary = content.get("summary", "")
            
            # Determine canonical topic
            title_lower = f"{title} {summary}".lower()
            topic_key = item.get("_id", "").replace("evt_", "")
            if "lab 2" in title_lower or "lab2" in title_lower:
                topic_key = "lab-2"
            elif "quiz 1" in title_lower or "quiz1" in title_lower:
                topic_key = "quiz-1"
            elif "checkpoint 2" in title_lower or "cp2" in title_lower or ("hackathon" in title_lower and "2" in title_lower):
                topic_key = "hackathon-cp2"

            if classification.get("type") == "DEADLINE" or schedule.get("deadline"):
                iso_dl = schedule.get("deadline") or schedule.get("start_time") or ""
                due_date = iso_dl[:10] if len(iso_dl) >= 10 else ""
                due_time = iso_dl[11:16] if len(iso_dl) >= 16 else ""
                display_title = title
                if "lab 2" in title_lower:
                    display_title = "Lab 2 · Prompt Engineering & LLM Basics"
                elif "quiz 1" in title_lower:
                    display_title = "Quiz 1 · Transformer Architecture"
                elif "checkpoint 2" in title_lower:
                    display_title = "Mini Hackathon · Checkpoint 2 (Working Mock)"

                by_topic[topic_key] = {
                    "id": topic_key,
                    "assignment_code": topic_key,
                    "title": display_title,
                    "due_date": due_date,
                    "due_time": due_time,
                    "iso_deadline": iso_dl,
                    "submission_link": "https://forms.gle/lab2-submit-k4" if "lab" in topic_key else ("https://vlearn.edu.vn/courses/ai-k4/quiz-1" if "quiz" in topic_key else "https://forms.gle/hackathon-cp2-submit"),
                    "format": "File notebook .ipynb hoặc link GitHub public" if "lab" in topic_key else ("Trắc nghiệm trực tiếp trên VLearn (30 phút)" if "quiz" in topic_key else "Link GitHub repo public + Video demo bấm được"),
                    "source_channel": f"#{source.get('channel_name', 'announcements')}",
                    "source_message_id": source.get("message_id", ""),
                    "source_label": f"Tin nhắn từ {source.get('author', {}).get('name', 'Giảng viên')}",
                    "author_name": source.get("author", {}).get("name", "Giảng viên"),
                    "author_role": "Giảng viên" if "Thay" in source.get("author", {}).get("name", "") or "Hoàng" in source.get("author", {}).get("name", "") else "Trợ giảng",
                    "status": "ACTIVE",
                    "is_important": classification.get("importance") == "HIGH",
                    "is_extension": any(k in summary.lower() for k in ["gia hạn", "thêm 2 tiếng", "dời hạn", "khẩn cấp"]),
                    "confidence": int(classification.get("confidence", 0.95) * 100),
                    "quote": summary,
                    "updated_at": item.get("system", {}).get("updated_at", "")
                }

        deadlines_list = list(by_topic.values())
        if deadlines_list:
            _atomic_json_write(DEADLINES_FILE, deadlines_list)

_store_instance = None

def get_store() -> JsonStore:
    global _store_instance
    if _store_instance is None:
        _store_instance = JsonStore()
    return _store_instance

from backend.config import DATA_CHANNELS_DIR

def get_channel_file(channel_name: str) -> Path:
    DATA_CHANNELS_DIR.mkdir(parents=True, exist_ok=True)
    clean_name = channel_name.replace("chan_", "").replace("#", "").strip()
    return DATA_CHANNELS_DIR / f"{clean_name}.json"

def get_channel_messages(channel_name: str) -> List[Dict[str, Any]]:
    filepath = get_channel_file(channel_name)
    if not filepath.exists():
        return []
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []

def save_channel_message(channel_name: str, message: Dict[str, Any]) -> Dict[str, Any]:
    filepath = get_channel_file(channel_name)
    messages = get_channel_messages(channel_name)
    
    # Check if message exists by id
    msg_id = message.get("id")
    found_idx = None
    if msg_id:
        for i, m in enumerate(messages):
            if m.get("id") == msg_id:
                found_idx = i
                break
    
    if found_idx is not None:
        messages[found_idx] = message
    else:
        messages.append(message)
        
    _atomic_json_write(filepath, messages)
    return message

def get_all_channels_messages() -> Dict[str, List[Dict[str, Any]]]:
    DATA_CHANNELS_DIR.mkdir(parents=True, exist_ok=True)
    result = {}
    for p in DATA_CHANNELS_DIR.glob("*.json"):
        ch_name = p.stem
        try:
            with open(p, "r", encoding="utf-8") as f:
                result[ch_name] = json.load(f)
        except Exception:
            result[ch_name] = []
    return result

def get_stored_deadlines() -> List[Dict[str, Any]]:
    if not DEADLINES_FILE.exists():
        return []
    try:
        with open(DEADLINES_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []
