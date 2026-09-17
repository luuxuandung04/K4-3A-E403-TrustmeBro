# coding: utf-8
import json
import os
import tempfile
from pathlib import Path
from typing import List, Optional, Dict, Any, Callable
from backend.config import DATA_DIR, EVENTS_FILE, DEADLINES_FILE
from backend.models.event_doc import EventDocument

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
        # Safe atomic write via temporary file
        parent_dir = self.filepath.parent
        parent_dir.mkdir(parents=True, exist_ok=True)
        with tempfile.NamedTemporaryFile("w", dir=parent_dir, delete=False, encoding="utf-8") as tf:
            json.dump(data, tf, ensure_ascii=False, indent=2)
            temp_path = tf.name
        os.replace(temp_path, self.filepath)

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
        # Update if exists, else append
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
        deadlines_list = []
        for item in raw_items:
            classification = item.get("classification", {})
            schedule = item.get("schedule", {})
            source = item.get("source", {})
            content = item.get("content", {})
            
            # If item is DEADLINE or has deadline timestamp
            if classification.get("type") == "DEADLINE" or schedule.get("deadline"):
                iso_dl = schedule.get("deadline") or schedule.get("start_time") or ""
                due_date = iso_dl[:10] if len(iso_dl) >= 10 else ""
                due_time = iso_dl[11:16] if len(iso_dl) >= 16 else ""
                deadlines_list.append({
                    "id": item.get("_id", "").replace("evt_", ""),
                    "assignment_code": item.get("_id", "").replace("evt_", ""),
                    "title": content.get("title", ""),
                    "due_date": due_date,
                    "due_time": due_time,
                    "iso_deadline": iso_dl,
                    "submission_link": "https://forms.gle/lab2-submit-k4" if "Lab" in content.get("title", "") else ("https://vlearn.edu.vn/courses/ai-k4/quiz-1" if "Quiz" in content.get("title", "") else ""),
                    "format": "Nộp bài theo yêu cầu",
                    "source_channel": f"#{source.get('channel_name', 'announcements')}",
                    "source_message_id": source.get("message_id", ""),
                    "source_label": f"Tin nhắn từ {source.get('author', {}).get('name', 'Giảng viên')}",
                    "author_name": source.get("author", {}).get("name", "Giảng viên"),
                    "author_role": "Giảng viên" if "Thay" in source.get("author", {}).get("name", "") else "Trợ giảng",
                    "status": "ACTIVE",
                    "is_important": classification.get("importance") == "HIGH",
                    "is_extension": "gia hạn" in content.get("summary", "").lower(),
                    "confidence": int(classification.get("confidence", 0.95) * 100),
                    "quote": content.get("summary", ""),
                    "updated_at": item.get("system", {}).get("updated_at", "")
                })
        
        if deadlines_list:
            parent_dir = DEADLINES_FILE.parent
            parent_dir.mkdir(parents=True, exist_ok=True)
            with tempfile.NamedTemporaryFile("w", dir=parent_dir, delete=False, encoding="utf-8") as tf:
                json.dump(deadlines_list, tf, ensure_ascii=False, indent=2)
                temp_path = tf.name
            os.replace(temp_path, DEADLINES_FILE)

_store_instance = None

def get_store() -> JsonStore:
    global _store_instance
    if _store_instance is None:
        _store_instance = JsonStore()
    return _store_instance
