# coding: utf-8
from pydantic import BaseModel, Field
from typing import Optional, Literal

# --- JSON 2: Backend -> AI Input ---
class AIContext(BaseModel):
    current_datetime: str
    timezone: str = "Asia/Ho_Chi_Minh"

class AIMessageAuthor(BaseModel):
    id: str
    name: str

class AIMessage(BaseModel):
    guild_id: str
    channel_id: str
    channel_name: str
    message_id: str
    author: AIMessageAuthor
    content: str
    timestamp: str
    message_url: str

class AIInput(BaseModel):
    context: AIContext
    message: AIMessage


# --- JSON 3: AI -> Backend Output ---
EventType = Literal["MEETING", "DEADLINE", "CLASS", "ANNOUNCEMENT", "OTHER"]
ImportanceLevel = Literal["HIGH", "NORMAL", "LOW"]
TimePrecision = Literal["START_TIME_ONLY", "EXACT_RANGE", "DEADLINE_ONLY", "DATE_ONLY", "NONE"]

class AIClassification(BaseModel):
    type: str = Field(description="Loại sự kiện: MEETING, DEADLINE, CLASS, ANNOUNCEMENT, OTHER")
    importance: str = Field(default="NORMAL", description="Mức độ quan trọng: HIGH, NORMAL, LOW")
    is_relevant: bool = Field(default=True, description="Tin nhắn có chứa thông tin sự kiện/lịch trình hữu ích không")
    confidence: float = Field(default=0.9, ge=0.0, le=1.0, description="Độ chắc chắn của AI (0.0 đến 1.0)")

class AIContent(BaseModel):
    title: str = Field(description="Tiêu đề ngắn gọn, chuẩn xác của sự kiện/deadline")
    summary: str = Field(description="Tóm tắt nội dung chính xác, không suy diễn")

class AISchedule(BaseModel):
    start_time: Optional[str] = Field(default=None, description="Thời gian bắt đầu theo ISO 8601 có múi giờ, null nếu không có")
    end_time: Optional[str] = Field(default=None, description="Thời gian kết thúc theo ISO 8601, TUYỆT ĐỐI null nếu tin nhắn không ghi rõ")
    deadline: Optional[str] = Field(default=None, description="Hạn chót nộp bài theo ISO 8601, TUYỆT ĐỐI null nếu đây không phải deadline nộp bài")
    time_precision: str = Field(default="START_TIME_ONLY", description="Độ chính xác thời gian: START_TIME_ONLY, EXACT_RANGE, DEADLINE_ONLY, DATE_ONLY, NONE")

class AITarget(BaseModel):
    audience: str = Field(default="UNKNOWN", description="Đối tượng: UNKNOWN, TOAN_BO_HOC_VIEN, NHOM, v.v.")
    course: Optional[str] = Field(default=None, description="Mã môn học nếu có trong tin nhắn, null nếu không có")

class AIOutput(BaseModel):
    classification: AIClassification
    content: AIContent
    schedule: AISchedule
    target: AITarget
