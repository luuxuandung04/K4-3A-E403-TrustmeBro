# coding: utf-8
import os
import glob
import json
from pathlib import Path
from typing import Dict, Any, List

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATA_DIR = BASE_DIR / "data"
CHANNELS_DIR = DATA_DIR / "channels"
DEADLINES_FILE = DATA_DIR / "deadlines.json"
EVENTS_FILE = DATA_DIR / "events.json"

# ============================================================================
# PRISTINE CLEAN DEMO DATA
# ============================================================================

CLEAN_CHANNELS = {
    "announcements": [
        {
            "id": "msg_ann_01",
            "channel": "announcements",
            "author": {
                "name": "Thầy Hoàng",
                "role": "Giảng viên",
                "avatar": "TH",
                "type": "teacher"
            },
            "content": "📢 **Thông báo lớp 3A · Gia hạn Lab 2: Prompt Engineering & LLM Basics**\n\nDo nhiều bạn cần thêm thời gian thử nghiệm kỹ thuật Few-shot và Chain-of-Thought trên notebook, BTC và Giảng viên quyết định gia hạn:\n• **Hạn chót mới:** `23:59 · Thứ Năm, 17/09/2026`\n• **Link form nộp:** https://forms.gle/lab2-submit-k4\n• **Yêu cầu:** File notebook .ipynb kèm link GitHub repo public.\n\nCác bạn chú ý nộp đúng hạn để tránh bị trừ điểm nhé!",
            "timestamp": "14:00 · 15/09",
            "type": "official"
        },
        {
            "id": "msg_ann_02",
            "channel": "announcements",
            "author": {
                "name": "Deadline Bot",
                "role": "APP",
                "avatar": "D",
                "type": "bot"
            },
            "content": "Đã trích xuất và đồng bộ thông báo gia hạn từ Thầy Hoàng vào #deadline-hub.",
            "timestamp": "14:01 · 15/09",
            "type": "bot_embed",
            "embed": {
                "badge": "🟢 THÔNG BÁO GIA HẠN DEADLINE",
                "badgeType": "green",
                "title": "Lab 2 · Prompt Engineering & LLM Basics",
                "deadline": "23:59 · 17/09/2026 (Còn ~10 tiếng)",
                "link": "https://forms.gle/lab2-submit-k4",
                "source": "Thầy Hoàng lúc 14:00 15/09 (#announcements)",
                "status": "ACTIVE"
            }
        },
        {
            "id": "msg_ann_03",
            "channel": "announcements",
            "author": {
                "name": "Cô Minh Anh",
                "role": "Giảng viên",
                "avatar": "MA",
                "type": "teacher"
            },
            "content": "📢 **Thông báo mở cổng Quiz 1: Transformer Architecture**\n\nCổng làm bài Quiz 1 trên VLearn đã mở. Hạn chót hoàn thành là **21:00 · Thứ Bảy, 19/09/2026**. Link làm bài: https://vlearn.edu.vn/courses/ai-k4/quiz-1. Thời gian làm bài 30 phút, chỉ tính lần nộp đầu tiên.",
            "timestamp": "09:00 · 14/09",
            "type": "official"
        }
    ],
    "deadline-hub": [
        {
            "id": "msg_hub_intro",
            "author": {
                "name": "Deadline Bot",
                "role": "APP",
                "avatar": "D",
                "type": "bot"
            },
            "content": "Chào mừng bạn đến với **#deadline-hub**! Kênh này **tự động tổng hợp hạn nộp 7 ngày tới (Hôm nay + 6 ngày)**. Bạn không cần gõ lệnh. Bot sẽ chỉ gửi thông báo mới khi có **thay đổi đột ngột sát hạn**, **deadline mới phát sinh trong ngày** hoặc **trường hợp khẩn cấp**!",
            "timestamp": "08:00 · Hôm nay",
            "type": "guide"
        },
        {
            "id": "msg_hub_digest",
            "author": {
                "name": "Deadline Bot",
                "role": "APP",
                "avatar": "D",
                "type": "bot"
            },
            "timestamp": "14:20 · Hôm nay",
            "type": "weekly_digest"
        }
    ],
    "lab-assignments": [
        {
            "id": "msg_lab_01",
            "channel": "lab-assignments",
            "author": {
                "name": "Duy Khánh",
                "role": "Học viên",
                "avatar": "DK",
                "type": "student"
            },
            "content": "Mọi người cho mình hỏi câu 3 phần Chain-of-Thought cần nộp kèm file log kết quả không ạ?",
            "timestamp": "10:15 · 16/09",
            "type": "chat"
        },
        {
            "id": "msg_lab_02",
            "channel": "lab-assignments",
            "author": {
                "name": "TA Tuấn",
                "role": "TA",
                "avatar": "TT",
                "type": "ta"
            },
            "content": "Chào Khánh, phần đó bạn chạy in thẳng output vào cell trong file notebook .ipynb là được nhé, không cần tách file log riêng.",
            "timestamp": "10:18 · 16/09",
            "type": "chat"
        },
        {
            "id": "msg_lab_03",
            "channel": "lab-assignments",
            "author": {
                "name": "Lan Anh",
                "role": "Học viên",
                "avatar": "LA",
                "type": "student"
            },
            "content": "Mọi người cho mình hỏi hạn nộp Lab 2 là hôm nay hay ngày mai thế?",
            "timestamp": "11:00 · 17/09",
            "type": "chat"
        },
        {
            "id": "msg_lab_04",
            "channel": "lab-assignments",
            "author": {
                "name": "TA Tuấn",
                "role": "TA",
                "avatar": "TT",
                "type": "ta"
            },
            "replyTo": "Lan Anh",
            "content": "Chào Lan Anh, hạn Lab 2 là **23:59 hôm nay (17/09)** nhé. Nộp file notebook hoặc link GitHub qua form. Cần check lịch tổng hợp và các thông báo mới nhất thì qua Bảng Tin **#deadline-hub** nha!",
            "timestamp": "11:02 · 17/09",
            "type": "chat"
        }
    ],
    "quiz-updates": [
        {
            "id": "msg_quiz_01",
            "channel": "quiz-updates",
            "author": {
                "name": "Cô Minh Anh",
                "role": "Giảng viên",
                "avatar": "MA",
                "type": "teacher"
            },
            "content": "Đã mở Quiz 1: Kiến trúc Transformer & Tokenization. Hạn chót: 21:00 Thứ Bảy 19/09.",
            "timestamp": "09:00 · 14/09",
            "type": "official"
        },
        {
            "id": "msg_quiz_02",
            "channel": "quiz-updates",
            "author": {
                "name": "Quang Dũng",
                "role": "Học viên",
                "avatar": "QD",
                "type": "student"
            },
            "content": "Cô ơi đề có mấy câu về Multi-Head Attention ạ?",
            "timestamp": "09:30 · 14/09",
            "type": "chat"
        },
        {
            "id": "msg_quiz_03",
            "channel": "quiz-updates",
            "author": {
                "name": "Cô Minh Anh",
                "role": "Giảng viên",
                "avatar": "MA",
                "type": "teacher"
            },
            "content": "Khoảng 5 câu lý thuyết tính ma trận Q, K, V nhé em.",
            "timestamp": "09:35 · 14/09",
            "type": "chat"
        }
    ],
    "hackathon": [
        {
            "id": "msg_hack_01",
            "channel": "hackathon",
            "author": {
                "name": "BTC Hackathon",
                "role": "Admin",
                "avatar": "BTC",
                "type": "admin"
            },
            "content": "🔥 **Quy chế Mini Hackathon AI Batch 04 · Checkpoint 2**\n\nMọi nhóm nộp link GitHub repo public và video/click prototype trước **21:00 ngày 16/09/2026** tại form: https://forms.gle/hackathon-cp2-submit. Nhóm nào nộp sau 21:00 sẽ bị 0 điểm mốc CP2.",
            "timestamp": "18:00 · 16/09",
            "type": "official"
        },
        {
            "id": "msg_hack_02",
            "channel": "hackathon",
            "author": {
                "name": "Deadline Bot",
                "role": "APP",
                "avatar": "D",
                "type": "bot"
            },
            "content": "Đã ghi nhận deadline: Mini Hackathon · Checkpoint 2 (21:00 · 16/09/2026). Nguồn: Quy chế Mini Hackathon.",
            "timestamp": "18:01 · 16/09",
            "type": "bot_embed",
            "embed": {
                "badge": "🏆 MINI HACKATHON · CP2",
                "badgeType": "green",
                "title": "Mini Hackathon · Checkpoint 2 (Working Mock)",
                "deadline": "21:00 · 16/09/2026",
                "link": "https://forms.gle/hackathon-cp2-submit",
                "source": "BTC Hackathon lúc 18:00 16/09 (#hackathon)",
                "status": "ACTIVE"
            }
        }
    ],
    "lich-hoc": [
        {
            "id": "msg_lh_01",
            "channel": "lich-hoc",
            "author": {
                "name": "Thầy Hoàng",
                "role": "Giảng viên",
                "avatar": "TH",
                "type": "teacher"
            },
            "content": "Lịch học tuần này: Thứ Tư học lý thuyết Transformer, Thứ Năm thực hành Prompt Engineering tại Lab E403.",
            "timestamp": "08:00 · 14/09",
            "type": "chat"
        }
    ]
}

CLEAN_DEADLINES = [
    {
        "id": "lab-2",
        "assignment_code": "lab-2",
        "title": "Lab 2 · Prompt Engineering & LLM Basics",
        "due_date": "2026-09-17",
        "due_time": "23:59",
        "iso_deadline": "2026-09-17T23:59:00+07:00",
        "submission_link": "https://forms.gle/lab2-submit-k4",
        "format": "File notebook .ipynb hoặc link GitHub public",
        "source_channel": "#announcements",
        "source_message_id": "msg_ann_01",
        "source_label": "Thông báo số 12 · bản gia hạn",
        "author_name": "Thầy Hoàng",
        "author_role": "Giảng viên",
        "status": "ACTIVE",
        "is_important": True,
        "is_extension": True,
        "confidence": 98,
        "quote": "Gia hạn Lab 2 đến 23:59 thứ Năm, 17/09. Nộp notebook hoặc link GitHub public.",
        "updated_at": "2026-09-15T14:00:00+07:00"
    },
    {
        "id": "quiz-1",
        "assignment_code": "quiz-1",
        "title": "Quiz 1 · Transformer Architecture",
        "due_date": "2026-09-19",
        "due_time": "21:00",
        "iso_deadline": "2026-09-19T21:00:00+07:00",
        "submission_link": "https://vlearn.edu.vn/courses/ai-k4/quiz-1",
        "format": "Trắc nghiệm trực tiếp trên VLearn (30 phút)",
        "source_channel": "#quiz-updates",
        "source_message_id": "msg_quiz_01",
        "source_label": "Tin nhắn từ Cô Minh Anh",
        "author_name": "Cô Minh Anh",
        "author_role": "Trợ giảng",
        "status": "ACTIVE",
        "is_important": True,
        "is_extension": False,
        "confidence": 97,
        "quote": "Quiz 1 đóng lúc 21:00 thứ Bảy, 19/09. Thời gian làm bài 30 phút.",
        "updated_at": "2026-09-14T09:00:00+07:00"
    },
    {
        "id": "hackathon-cp2",
        "assignment_code": "hackathon-cp2",
        "title": "Mini Hackathon · Checkpoint 2 (Working Mock)",
        "due_date": "2026-09-16",
        "due_time": "21:00",
        "iso_deadline": "2026-09-16T21:00:00+07:00",
        "submission_link": "https://forms.gle/hackathon-cp2-submit",
        "format": "Link GitHub repo public + Video demo bấm được",
        "source_channel": "#hackathon",
        "source_message_id": "msg_hack_01",
        "source_label": "Tin nhắn từ BTC Hackathon",
        "author_name": "BTC Hackathon",
        "author_role": "Trợ giảng",
        "status": "ACTIVE",
        "is_important": True,
        "is_extension": False,
        "confidence": 99,
        "quote": "Nộp link repo public, prototype và phần cập nhật spec trước 21:00 ngày 16/09.",
        "updated_at": "2026-09-16T18:00:00+07:00"
    }
]

CLEAN_EVENTS = [
    {
        "_id": "evt_lab-2",
        "source": {
            "guild_id": "123456789012345678",
            "channel_id": "chan_announcements",
            "channel_name": "announcements",
            "message_id": "msg_ann_01",
            "message_url": "https://discord.com/channels/123456789012345678/chan_announcements/msg_ann_01",
            "author": { "id": "1029384756", "name": "Thầy Hoàng" },
            "created_at": "2026-09-15T14:00:00+07:00"
        },
        "classification": {
            "type": "DEADLINE",
            "importance": "HIGH",
            "is_relevant": True,
            "confidence": 0.98
        },
        "content": {
            "title": "Lab 2 · Prompt Engineering & LLM Basics",
            "summary": "Gia hạn Lab 2 đến 23:59 thứ Năm, 17/09. Nộp notebook hoặc link GitHub public."
        },
        "schedule": {
            "start_time": None,
            "end_time": None,
            "deadline": "2026-09-17T23:59:00+07:00",
            "time_precision": "DEADLINE_ONLY"
        },
        "target": { "audience": "UNKNOWN", "course": "AI Batch 04" },
        "system": {
            "status": "PROCESSED",
            "created_at": "2026-09-15T14:00:00+07:00",
            "updated_at": "2026-09-15T14:00:00+07:00",
            "conflict_detected": False,
            "conflict_note": None,
            "notification_priority": "P0",
            "notification_sent": True,
            "topic_key": "lab-2"
        }
    },
    {
        "_id": "evt_quiz-1",
        "source": {
            "guild_id": "123456789012345678",
            "channel_id": "chan_quiz_updates",
            "channel_name": "quiz-updates",
            "message_id": "msg_quiz_01",
            "message_url": "https://discord.com/channels/123456789012345678/chan_quiz_updates/msg_quiz_01",
            "author": { "id": "1029384756", "name": "Cô Minh Anh" },
            "created_at": "2026-09-14T09:00:00+07:00"
        },
        "classification": {
            "type": "DEADLINE",
            "importance": "HIGH",
            "is_relevant": True,
            "confidence": 0.97
        },
        "content": {
            "title": "Quiz 1 · Transformer & Tokenization",
            "summary": "Quiz 1 đóng lúc 21:00 thứ Bảy, 19/09. Thời gian làm bài 30 phút."
        },
        "schedule": {
            "start_time": None,
            "end_time": None,
            "deadline": "2026-09-19T21:00:00+07:00",
            "time_precision": "DEADLINE_ONLY"
        },
        "target": { "audience": "UNKNOWN", "course": "AI Batch 04" },
        "system": {
            "status": "PROCESSED",
            "created_at": "2026-09-14T09:00:00+07:00",
            "updated_at": "2026-09-14T09:00:00+07:00",
            "conflict_detected": False,
            "conflict_note": None,
            "notification_priority": "P1",
            "notification_sent": True,
            "topic_key": "quiz-1"
        }
    },
    {
        "_id": "evt_hackathon-cp2",
        "source": {
            "guild_id": "123456789012345678",
            "channel_id": "chan_hackathon",
            "channel_name": "hackathon",
            "message_id": "msg_hack_01",
            "message_url": "https://discord.com/channels/123456789012345678/chan_hackathon/msg_hack_01",
            "author": { "id": "1029384756", "name": "BTC Hackathon" },
            "created_at": "2026-09-16T18:00:00+07:00"
        },
        "classification": {
            "type": "DEADLINE",
            "importance": "HIGH",
            "is_relevant": True,
            "confidence": 0.99
        },
        "content": {
            "title": "Mini Hackathon · Checkpoint 2 (Working Mock)",
            "summary": "Nộp link repo public, prototype và phần cập nhật spec trước 21:00 ngày 16/09."
        },
        "schedule": {
            "start_time": None,
            "end_time": None,
            "deadline": "2026-09-16T21:00:00+07:00",
            "time_precision": "DEADLINE_ONLY"
        },
        "target": { "audience": "UNKNOWN", "course": "AI Batch 04" },
        "system": {
            "status": "PROCESSED",
            "created_at": "2026-09-16T18:00:00+07:00",
            "updated_at": "2026-09-16T18:00:00+07:00",
            "conflict_detected": False,
            "conflict_note": None,
            "notification_priority": "P1",
            "notification_sent": True,
            "topic_key": "hackathon-cp2"
        }
    }
]

def reset_all_demo_data() -> Dict[str, Any]:
    """
    Cleans up all test chatter, removes test debris/temp files,
    and restores pure pristine demo dataset for channels, deadlines, and events.
    """
    # 1. Clean channels directory: remove temp files and test channels
    CHANNELS_DIR.mkdir(parents=True, exist_ok=True)
    for p in CHANNELS_DIR.glob("*"):
        if p.is_file():
            stem = p.stem
            if stem.startswith("tmp") or p.name.startswith("tmp") or stem == "99887766554433":
                try:
                    p.unlink()
                except Exception:
                    pass

    # 2. Write pristine channels
    for ch_name, msgs in CLEAN_CHANNELS.items():
        ch_file = CHANNELS_DIR / f"{ch_name}.json"
        with open(ch_file, "w", encoding="utf-8") as f:
            json.dump(msgs, f, ensure_ascii=False, indent=2)

    # 3. Write pristine deadlines.json
    with open(DEADLINES_FILE, "w", encoding="utf-8") as f:
        json.dump(CLEAN_DEADLINES, f, ensure_ascii=False, indent=2)

    # 4. Write pristine events.json
    with open(EVENTS_FILE, "w", encoding="utf-8") as f:
        json.dump(CLEAN_EVENTS, f, ensure_ascii=False, indent=2)

    # 5. Reload in-memory JsonStore singleton
    try:
        import backend.db.json_store as jstore
        jstore._store_instance = jstore.JsonStore(EVENTS_FILE)
    except Exception:
        pass

    # 6. Log the action
    try:
        from backend.services.pipeline_logger import write_log
        write_log(
            stage="JSON_STORE",
            level="INFO",
            message="Khôi phục toàn diện dữ liệu Demo chuẩn (Cleaned test data)",
            meta={"Status": "CLEAN_RESET", "Events": len(CLEAN_EVENTS), "Deadlines": len(CLEAN_DEADLINES)}
        )
    except Exception:
        pass

    return {
        "status": "ok",
        "message": "Đã dọn sạch toàn bộ tin nhắn test và khôi phục dữ liệu Demo chuẩn!",
        "channels_reset": list(CLEAN_CHANNELS.keys()),
        "deadlines_count": len(CLEAN_DEADLINES),
        "events_count": len(CLEAN_EVENTS)
    }

if __name__ == "__main__":
    res = reset_all_demo_data()
    print("DEMO RESET RESULT:", res["message"])
