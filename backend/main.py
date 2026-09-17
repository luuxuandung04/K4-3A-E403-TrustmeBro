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
    # 0. Log incoming raw event
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
    ai_output = extract_semantics(ai_input)
    pipeline_logger.log_ai_extraction(
        engine="Gemini / Deterministic Fallback",
        model=GEMINI_MODEL,
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

# Mount codebase as static website
from pathlib import Path
from fastapi.staticfiles import StaticFiles

CODEBASE_DIR = Path(__file__).resolve().parent.parent / "codebase"
if CODEBASE_DIR.exists():
    app.mount("/", StaticFiles(directory=str(CODEBASE_DIR), html=True), name="codebase_ui")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
