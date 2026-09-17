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

class EventDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str = Field(alias="_id")
    source: EventSource
    classification: AIClassification
    content: AIContent
    schedule: AISchedule
    target: AITarget
    system: EventSystem
