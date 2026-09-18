from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from .ai_io import AIMessageAuthor, AIClassification, AIContent, AISchedule, AITarget

# --- JSON 4: Backend -> Document Store Schema ---
class EventSource(BaseModel):
    guild_id: str
    channel_id: str
    channel_name: str
    message_id: str
    message_url: str
    author: AIMessageAuthor
    created_at: str

class EventSystem(BaseModel):
    status: str = "PROCESSED"
    created_at: str
    updated_at: str
    conflict_detected: bool = False
    conflict_note: Optional[str] = None
    needs_review: bool = False
    review_reason: Optional[str] = None
    notification_priority: str = "P2"  # P0=khẩn cấp, P1=quan trọng, P2=thường, P3=tham khảo
    notification_sent: bool = False
    notification_sent_at: Optional[str] = None
    topic_key: Optional[str] = None  # Dedup key: "lab-2", "quiz-1", etc.


class EventDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str = Field(alias="_id")
    source: EventSource
    classification: AIClassification
    content: AIContent
    schedule: AISchedule
    target: AITarget
    system: EventSystem
