# coding: utf-8
import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env file if present
load_dotenv()

# Base Paths
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
DATA_CHANNELS_DIR = DATA_DIR / "channels"
EVENTS_FILE = DATA_DIR / "events.json"
DEADLINES_FILE = DATA_DIR / "deadlines.json"
LOGS_DIR = BASE_DIR / "logs"
LOG_FILE = LOGS_DIR / "pipeline.log"

# Timezone & Context
DEFAULT_TIMEZONE = "Asia/Ho_Chi_Minh"

# Whitelist Channels (by ID or channel_name)
WHITELIST_CHANNELS = {
    "99887766554433": "dự-án-ai",
    "chan_announcements": "announcements",
    "chan_deadline_hub": "deadline-hub",
    "chan_deadline-hub": "deadline-hub",
    "chan_lab_assignments": "lab-assignments",
    "chan_lab-assignments": "lab-assignments",
    "chan_quiz_updates": "quiz-updates",
    "chan_quiz-updates": "quiz-updates",
    "chan_hackathon": "hackathon",
    "chan_lich_hoc": "lich-hoc",
    "chan_lich-hoc": "lich-hoc",
}

# Whitelist Teacher/TA Author IDs or Names
WHITELIST_ROLES = ["Giảng viên", "Trợ giảng", "Admin", "BTC Hackathon", "Teacher", "TA"]
WHITELIST_AUTHORS = ["ThayDong_Tech", "Thầy Hoàng", "Cô Minh Anh", "TA Tuấn", "BTC Hackathon"]

# Candidate Gate Keywords
KEYWORD_SIGNALS = [
    "deadline", "hạn nộp", "nộp bài", "nộp trước", "gia hạn", "dời hạn",
    "họp", "meeting", "meet", "lịch học", "buổi học", "quiz", "lab", "checkpoint",
    "thứ hai", "thứ ba", "thứ tư", "thứ năm", "thứ sáu", "thứ bảy", "chủ nhật",
    "ngày mai", "hôm nay", "tối nay", "sáng mai", "chiều mai", "tuần này", "tuần sau",
    "@everyone", "@here"
]

# AI Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

# Server Configuration
HOST = "127.0.0.1"
PORT = 8000
