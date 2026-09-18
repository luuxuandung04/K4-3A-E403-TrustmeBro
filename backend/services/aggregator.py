# coding: utf-8
from datetime import datetime, timedelta, date
from typing import Optional, List
import pytz
from backend.config import DEFAULT_TIMEZONE
from backend.db.json_store import get_store
from backend.models.event_doc import EventDocument
from backend.models.discord_payload import AggregatedViewModel, AggregatedItem, PeriodInfo

def aggregate_events(
    start_date: Optional[date] = None,
    period_days: int = 7,
    period_type: str = "WEEK"
) -> AggregatedViewModel:
    """
    MongoDB/Store -> Backend Aggregator:
    Aggregates active events into a clean UI View Model for a given period.
    """
    store = get_store()
    tz = pytz.timezone(DEFAULT_TIMEZONE)
    
    if start_date is None:
        # Default: current week starting from Monday or current rolling today
        today = datetime.now(tz).date()
        start_date = today

    end_date = start_date + timedelta(days=period_days - 1)
    
    all_events = store.list_all()
    aggregated_items: List[AggregatedItem] = []

    for doc in all_events:
        if getattr(doc.system, "status", None) in ("SUPERSEDED", "CANCELLED"):
            continue
        # Determine effective datetime
        target_iso = (
            doc.schedule.deadline or
            doc.schedule.start_time or
            doc.system.created_at
        )
        if not target_iso:
            continue
        
        try:
            event_dt = datetime.fromisoformat(target_iso)
            event_date = event_dt.date()
        except Exception:
            continue

        # Check if within period
        if start_date <= event_date <= end_date:
            time_str = event_dt.strftime("%H:%M")
            date_str = event_dt.strftime("%Y-%m-%d")
            
            aggregated_items.append(AggregatedItem(
                type=doc.classification.type,
                date=date_str,
                time=time_str,
                title=doc.content.title,
                source_url=doc.source.message_url
            ))

    # Sort by date and time
    aggregated_items.sort(key=lambda item: (item.date, item.time))

    return AggregatedViewModel(
        period=PeriodInfo(
            type=period_type,
            from_date=start_date.strftime("%Y-%m-%d"),
            to_date=end_date.strftime("%Y-%m-%d")
        ),
        items=aggregated_items
    )
