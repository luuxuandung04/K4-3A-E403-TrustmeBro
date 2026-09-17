# coding: utf-8
from datetime import datetime
from typing import Tuple, Optional
import pytz
from backend.config import DEFAULT_TIMEZONE
from backend.models.ai_io import AIInput, AIOutput
from backend.models.event_doc import EventDocument, EventSource, EventSystem
from backend.db.json_store import get_store

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

    # 2. Conflict Detection with Existing Events in Store
    existing_events = store.list_all()
    conflict_detected = False
    conflict_note = None

    for existing in existing_events:
        # Check if same title or assignment topic
        if existing.content.title.strip().lower() == ai_output.content.title.strip().lower():
            # Compare schedule
            ex_deadline = existing.schedule.deadline
            new_deadline = ai_output.schedule.deadline
            ex_start = existing.schedule.start_time
            new_start = ai_output.schedule.start_time
            
            if new_deadline and ex_deadline and new_deadline != ex_deadline:
                conflict_detected = True
                conflict_note = f"Phát hiện lệch deadline giữa nguồn mới ({new_deadline}) và nguồn cũ {existing.id} ({ex_deadline})"
                break
            elif new_start and ex_start and new_start != ex_start:
                conflict_detected = True
                conflict_note = f"Phát hiện lệch giờ bắt đầu giữa nguồn mới ({new_start}) và nguồn cũ {existing.id} ({ex_start})"
                break

    # 3. Create Document ID and Timestamps
    tz = pytz.timezone(DEFAULT_TIMEZONE)
    now_str = datetime.now(tz).isoformat(timespec="seconds")
    
    # ID format: evt_<message_id>
    doc_id = f"evt_{msg.message_id}"

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
            conflict_note=conflict_note
        )
    )

    # 4. Save to Store
    saved_doc = store.insert(doc)
    return True, "Validated and saved", saved_doc
