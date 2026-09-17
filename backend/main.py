# coding: utf-8
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Dict, Any
from datetime import datetime, date
import pytz

from backend.config import DEFAULT_TIMEZONE, GEMINI_MODEL
from backend.models.discord_raw import DiscordRawEvent
from backend.models.event_doc import EventDocument
from backend.models.discord_payload import DiscordPayload, AggregatedViewModel
from backend.services.filter_router import filter_and_route
from backend.services.ai_extractor import extract_semantics
from backend.services.validator import validate_and_create_document
from backend.services.aggregator import aggregate_events
from backend.services.discord_formatter import format_discord_payload
from backend.db.json_store import get_store
from backend.services import pipeline_logger

app = FastAPI(
    title="Discord Deadline & Logistics Guard API",
    description="Backend pipeline processing Discord raw events, extracting semantics, and aggregating 7-day schedule payload.",
    version="2.0.0"
)

# Enable CORS for local development and browser prototype
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    store = get_store()
    return {
        "status": "ok",
        "storage": "pure_json_store",
        "file": str(store.filepath),
        "events_count": len(store.list_all()),
        "ai_model": GEMINI_MODEL,
        "timezone": DEFAULT_TIMEZONE
    }

@app.get("/logs")
def get_pipeline_logs(limit: int = Query(default=100, ge=1, le=500)) -> Dict[str, Any]:
    """Returns standardized pipeline logs for monitoring and verification."""
    from backend.config import LOG_FILE
    return {
        "log_file": str(LOG_FILE),
        "lines": pipeline_logger.get_recent_logs(limit=limit)
    }

@app.post("/events/discord")
def process_discord_event(event: DiscordRawEvent) -> Dict[str, Any]:
    """
    Discord -> Backend Webhook:
    Processes a raw MESSAGE_CREATE event through the entire 6-stage pipeline.
    """
    # 0. Log incoming raw event and persist to channel json file
    ch_clean = event.d.channel_id.replace("chan_", "").replace("#", "").strip()
    save_channel_message(ch_clean, {
        "id": event.d.id,
        "channel": ch_clean,
        "author": {
            "name": event.d.author.username,
            "role": "Giảng viên" if any(k in event.d.author.username.lower() for k in ["thay", "hoang", "minh anh", "btc"]) else "Học viên",
            "avatar": event.d.author.username[:2].upper(),
            "type": "teacher" if any(k in event.d.author.username.lower() for k in ["thay", "hoang", "minh anh", "btc"]) else "student"
        },
        "content": event.d.content,
        "timestamp": event.d.timestamp[:16].replace("T", " "),
        "type": "chat"
    })
    pipeline_logger.log_event_received(
        channel_id=event.d.channel_id,
        author_name=event.d.author.username,
        msg_id=event.d.id,
        content=event.d.content
    )

    # 1. Filter / Candidate Gate
    passed, filter_reason, ai_input = filter_and_route(event)
    pipeline_logger.log_candidate_gate(
        passed=passed,
        reason=filter_reason,
        author_name=event.d.author.username,
        channel_name=event.d.channel_id
    )

    if not passed or ai_input is None:
        return {
            "status": "IGNORED",
            "reason": filter_reason,
            "raw_event": event.model_dump()
        }

    # 2. AI Semantic Extraction (Zero-hallucination)
    from backend.services import ai_extractor
    ai_output = extract_semantics(ai_input)
    pipeline_logger.log_ai_extraction(
        engine=ai_extractor.LAST_ENGINE_USED,
        model=GEMINI_MODEL if "Gemini" in ai_extractor.LAST_ENGINE_USED else "Offline Rule Engine",
        classification=ai_output.classification.type,
        title=ai_output.content.title,
        schedule=ai_output.schedule.model_dump(),
        confidence=ai_output.classification.confidence
    )

    # 3. Validation, Conflict Detection & JSON Store Persistence
    valid, val_reason, doc = validate_and_create_document(ai_input, ai_output)
    pipeline_logger.log_validation(
        is_valid=valid,
        reason=val_reason or "",
        doc_id=doc.id if doc else None,
        conflict_detected=doc.system.conflict_detected if doc else False,
        conflict_note=doc.system.conflict_note if doc else None
    )

    if not valid or doc is None:
        return {
            "status": "REJECTED",
            "reason": val_reason,
            "raw_event": event.model_dump(),
            "ai_input": ai_input.model_dump(),
            "ai_output": ai_output.model_dump()
        }

    # Log storage success
    store = get_store()
    pipeline_logger.log_storage(
        doc_id=doc.id,
        total_count=len(store.list_all()),
        file_path=str(store.filepath)
    )

    # 4. Generate updated 7-day Discord UI Payload
    view_model = aggregate_events()
    discord_payload = format_discord_payload(view_model)
    pipeline_logger.log_discord_payload(
        target_channel="deadline-hub",
        action="UPDATE_ALERT_AND_DIGEST",
        details=f"Items in digest: {len(view_model.items)}"
    )

    return {
        "status": "PROCESSED",
        "reason": filter_reason,
        "engine_used": ai_extractor.LAST_ENGINE_USED,
        "key_status": ai_extractor.LAST_KEY_STATUS,
        "key_warning": ai_extractor.LAST_ERROR_MSG,
        "raw_event": event.model_dump(),
        "ai_input": ai_input.model_dump(),
        "ai_output": ai_output.model_dump(),
        "saved_document": doc.model_dump(by_alias=True),
        "ui_view_model": view_model.model_dump(by_alias=True),
        "discord_payload": discord_payload.model_dump()
    }

@app.get("/schedule/digest")
def get_schedule_digest(
    days: int = Query(default=7, ge=1, le=30),
    from_date: Optional[str] = Query(default=None, description="YYYY-MM-DD")
) -> Dict[str, Any]:
    """
    Aggregator -> Discord API:
    Returns the current aggregated View Model and ready-to-render Discord UI Payload.
    """
    target_start_date = None
    if from_date:
        try:
            target_start_date = datetime.strptime(from_date, "%Y-%m-%d").date()
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid from_date format, must be YYYY-MM-DD")

    view_model = aggregate_events(start_date=target_start_date, period_days=days)
    discord_payload = format_discord_payload(view_model)

    return {
        "view_model": view_model.model_dump(by_alias=True),
        "discord_payload": discord_payload.model_dump()
    }

@app.get("/events")
def list_events(limit: int = 50) -> List[Dict[str, Any]]:
    """Returns stored events from data/events.json"""
    store = get_store()
    docs = store.list_all()
    return [d.model_dump(by_alias=True) for d in docs[:limit]]

@app.get("/events/{event_id}")
def get_event(event_id: str) -> Dict[str, Any]:
    store = get_store()
    doc = store.get_by_id(event_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Event not found")
    return doc.model_dump(by_alias=True)

# ============================================================================
# PERSISTENT CHANNELS & DEADLINES API (Fix F5 data loss)
# ============================================================================
from backend.db.json_store import (
    get_channel_messages,
    save_channel_message,
    get_all_channels_messages,
    get_stored_deadlines
)

@app.get("/deadlines")
def list_deadlines() -> List[Dict[str, Any]]:
    """Returns persistent deadlines from data/deadlines.json"""
    return get_stored_deadlines()

@app.post("/deadlines")
def create_manual_deadline(item: Dict[str, Any]) -> Dict[str, Any]:
    """Manually add or update a deadline and persist to data/deadlines.json and data/events.json"""
    from backend.models.event_doc import EventDocument, EventSource, EventSystem
    from backend.models.ai_io import (
        AIMessageAuthor, AIClassification, AIContent, AISchedule, AITarget
    )
    from datetime import datetime, timezone

    topic = item.get("assignment_code") or item.get("id") or f"manual_{int(datetime.now().timestamp())}"
    due_date = item.get("due_date") or item.get("date") or "2026-09-17"
    due_time = item.get("due_time") or item.get("time") or "23:59"
    iso_str = item.get("iso_deadline") or f"{due_date}T{due_time}:00+07:00"

    guild_id = "123456789012345678"
    chan_id = f"chan_{item.get('source_channel', 'announcements').replace('#', '')}"
    msg_id = item.get("source_message_id", f"manual_{int(datetime.now().timestamp())}")
    msg_url = f"https://discord.com/channels/{guild_id}/{chan_id}/{msg_id}"

    doc = EventDocument(
        id=f"evt_{topic}",
        source=EventSource(
            guild_id=guild_id,
            channel_id=chan_id,
            channel_name=item.get("source_channel", "announcements").replace("#", ""),
            message_id=msg_id,
            message_url=msg_url,
            author=AIMessageAuthor(id="manual_admin", name=item.get("author_name", "Admin")),
            created_at=datetime.now(timezone.utc).isoformat()
        ),
        classification=AIClassification(
            type="DEADLINE",
            importance="HIGH" if item.get("is_important", True) else "NORMAL",
            is_relevant=True,
            confidence=1.0
        ),
        content=AIContent(
            title=item.get("title", "Bài tập thủ công"),
            summary=item.get("quote", "Admin nhập thủ công.")
        ),
        schedule=AISchedule(
            deadline=iso_str,
            time_precision="DEADLINE_ONLY"
        ),
        target=AITarget(course="AI Batch 04"),
        system=EventSystem(
            status="PROCESSED",
            created_at=datetime.now(timezone.utc).isoformat(),
            updated_at=datetime.now(timezone.utc).isoformat(),
            topic_key=topic,
            notification_priority="P1"
        )
    )
    store = get_store()
    store.insert(doc)
    return item

@app.get("/channels")
def list_all_channels() -> Dict[str, List[Dict[str, Any]]]:
    """Returns persistent message history for all channels (data/channels/*.json)"""
    return get_all_channels_messages()

@app.get("/channels/{channel_name}/messages")
def get_channel_msg_list(channel_name: str) -> List[Dict[str, Any]]:
    """Returns stored messages for a specific channel"""
    return get_channel_messages(channel_name)

@app.post("/channels/{channel_name}/messages")
def append_channel_message(channel_name: str, message: Dict[str, Any]) -> Dict[str, Any]:
    """Appends and persists a new message to data/channels/{channel_name}.json"""
    return save_channel_message(channel_name, message)

@app.post("/admin/reset-demo-data")
def api_reset_demo_data() -> Dict[str, Any]:
    """Cleans up all test debris, temp files, and restores pristine demo dataset"""
    from backend.services.demo_reset import reset_all_demo_data
    return reset_all_demo_data()


# Mount codebase as static website
from pathlib import Path
from fastapi.staticfiles import StaticFiles

CODEBASE_DIR = Path(__file__).resolve().parent.parent / "codebase"
if CODEBASE_DIR.exists():
    app.mount("/", StaticFiles(directory=str(CODEBASE_DIR), html=True), name="codebase_ui")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
