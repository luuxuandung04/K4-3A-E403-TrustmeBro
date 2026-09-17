# coding: utf-8
import re
from datetime import datetime
from typing import Tuple, Optional
import pytz
from backend.config import DEFAULT_TIMEZONE
from backend.models.ai_io import AIInput, AIOutput
from backend.models.event_doc import EventDocument, EventSource, EventSystem
from backend.db.json_store import get_store

# Dynamic topic patterns — no more hardcoded 3 topics
_TOPIC_PATTERNS = [
    (r'\blab\s*(\d+)', lambda m: f"lab-{m.group(1)}"),
    (r'\bquiz\s*(\d+)', lambda m: f"quiz-{m.group(1)}"),
    (r'\bcheckpoint\s*(\d+)', lambda m: f"checkpoint-{m.group(1)}"),
    (r'\bhackathon\b.*?\b(?:cp|checkpoint)\s*(\d+)', lambda m: f"hackathon-cp{m.group(1)}"),
    (r'\bcapstone\b', lambda _: "capstone"),
    (r'\bproject\b', lambda _: "project"),
    (r'\bseminar\b', lambda _: "seminar"),
    (r'\bworkshop\b', lambda _: "workshop"),
]

def get_assignment_topic(title: str, summary: str = "") -> Optional[str]:
    """Dynamic topic extraction — matches Lab N, Quiz N, Checkpoint N, etc."""
    text = f"{title} {summary}".lower()
    for pattern, builder in _TOPIC_PATTERNS:
        m = re.search(pattern, text, re.IGNORECASE)
        if m:
            return builder(m)
    return None

def determine_notification_priority(ai_output: AIOutput, content_text: str) -> str:
    """
    Determine notification priority based on classification + content signals.
    P0 = khẩn cấp (gia hạn sát hạn, xung đột, sự cố)
    P1 = quan trọng (deadline mới, lịch họp mới)
    P2 = thường (nhắc nhở, thông báo FYI, update)
    P3 = tham khảo (link tài liệu, tips)
    """
    content_lower = content_text.lower()
    importance = ai_output.classification.importance
    event_type = ai_output.classification.type

    # P0: Khẩn cấp
    urgent_signals = ["khẩn cấp", "gấp", "đột xuất", "sự cố", "gia hạn", "dời hạn", "thay đổi đột ngột"]
    if importance == "HIGH" and any(s in content_lower for s in urgent_signals):
        return "P0"

    # P1: Quan trọng — deadline/meeting mới (bắt buộc phải có mốc thời gian cụ thể)
    if event_type in ("DEADLINE", "MEETING") and importance in ("HIGH", "NORMAL"):
        if ai_output.schedule.deadline or ai_output.schedule.start_time:
            return "P1"
        return "P2"

    # P1: CLASS with specific time
    if event_type == "CLASS" and ai_output.schedule.start_time:
        return "P1"

    # P3: Tham khảo — chỉ link tài liệu, không có deadline/time
    reference_signals = ["tài liệu", "tham khảo", "đọc thêm", "slide", "ghi chú"]
    if any(s in content_lower for s in reference_signals) and event_type in ("OTHER", "ANNOUNCEMENT"):
        if not ai_output.schedule.deadline and not ai_output.schedule.start_time:
            return "P3"

    # P2: Thông báo thường (default for relevant content)
    return "P2"

def validate_and_create_document(ai_input: AIInput, ai_output: AIOutput) -> Tuple[bool, Optional[str], Optional[EventDocument]]:
    """
    Validates AI Output semantics, performs conflict detection with existing store,
    enriches with Discord source metadata, and persists to JSON storage.
    """
    store = get_store()
    msg = ai_input.message

    # 1. Validation & Quality checks
    if not ai_output.classification.is_relevant:
        return False, "AI đánh giá tin nhắn không có giá trị sự kiện/deadline", None

    # Enforce Zero-hallucination constraint
    if ai_output.classification.type == "MEETING":
        if ai_output.schedule.deadline is not None:
            # Force null if mistakenly set
            ai_output.schedule.deadline = None
    elif ai_output.classification.type == "DEADLINE":
        if ai_output.schedule.start_time is not None and ai_output.schedule.deadline is None:
            ai_output.schedule.deadline = ai_output.schedule.start_time
            ai_output.schedule.start_time = None

    # 2. Conflict Detection & Authoritative Superseding
    existing_events = store.list_all()
    conflict_detected = False
    conflict_note = None

    author_name = msg.author.name.lower()
    is_teacher_or_admin = any(k in author_name for k in ["thầy", "cô", "giảng viên", "btc", "admin"]) or "announcements" in msg.channel_name.lower()
    is_extension_signal = any(k in msg.content.lower() for k in ["gia hạn", "dời hạn", "thay đổi", "cập nhật", "khẩn cấp", "thêm 2 tiếng", "mới nhất", "sát hạn"])

    curr_topic = get_assignment_topic(ai_output.content.title, ai_output.content.summary)

    for existing in existing_events:
        ex_topic = get_assignment_topic(existing.content.title, existing.content.summary)
        is_same_topic = (curr_topic and ex_topic and curr_topic == ex_topic) or (
            existing.content.title.strip().lower() == ai_output.content.title.strip().lower()
        )

        if is_same_topic:
            ex_deadline = existing.schedule.deadline
            new_deadline = ai_output.schedule.deadline
            ex_start = existing.schedule.start_time
            new_start = ai_output.schedule.start_time
            
            if new_deadline and ex_deadline and new_deadline != ex_deadline:
                if is_teacher_or_admin and (is_extension_signal or "announcements" in msg.channel_name.lower()):
                    # Official Teacher/Admin extension/update supersedes the old deadline
                    existing.system.status = "SUPERSEDED"
                    existing.system.conflict_detected = False
                    existing.system.conflict_note = f"Đã được gia hạn sang {new_deadline} theo thông báo mới {msg.message_id}"
                    store.update(existing.id, existing.model_dump(by_alias=True))
                else:
                    conflict_detected = True
                    conflict_note = f"Phát hiện lệch deadline giữa nguồn mới ({new_deadline}) và nguồn cũ {existing.id} ({ex_deadline})"
                    break
            elif new_start and ex_start and new_start != ex_start:
                if is_teacher_or_admin:
                    existing.system.status = "SUPERSEDED"
                    existing.system.conflict_detected = False
                    existing.system.conflict_note = f"Lịch họp đã cập nhật sang {new_start} theo thông báo mới {msg.message_id}"
                    store.update(existing.id, existing.model_dump(by_alias=True))
                else:
                    conflict_detected = True
                    conflict_note = f"Phát hiện lệch giờ bắt đầu giữa nguồn mới ({new_start}) và nguồn cũ {existing.id} ({ex_start})"
                    break

    # 3. Create Document ID and Timestamps
    tz = pytz.timezone(DEFAULT_TIMEZONE)
    now_str = datetime.now(tz).isoformat(timespec="seconds")
    
    # ID format: evt_<message_id>
    doc_id = f"evt_{msg.message_id}"

    # Calculate notification priority and topic key
    priority = determine_notification_priority(ai_output, msg.content)
    if conflict_detected:
        priority = "P0"  # Conflicts are always urgent

    # Build EventDocument
    doc = EventDocument(
        id=doc_id,
        source=EventSource(
            guild_id=msg.guild_id,
            channel_id=msg.channel_id,
            channel_name=msg.channel_name,
            message_id=msg.message_id,
            message_url=msg.message_url,
            author=msg.author,
            created_at=msg.timestamp
        ),
        classification=ai_output.classification,
        content=ai_output.content,
        schedule=ai_output.schedule,
        target=ai_output.target,
        system=EventSystem(
            status="PROCESSED",
            created_at=now_str,
            updated_at=now_str,
            conflict_detected=conflict_detected,
            conflict_note=conflict_note,
            notification_priority=priority,
            topic_key=curr_topic
        )
    )

    # 4. Save to Store
    saved_doc = store.insert(doc)
    return True, "Validated and saved", saved_doc
