# coding: utf-8
import pytest
from datetime import datetime
from fastapi.testclient import TestClient

from backend.main import app
from backend.models.discord_raw import DiscordRawEvent, RawMessageData, RawAuthor
from backend.services.filter_router import filter_and_route
from backend.services.ai_extractor import extract_semantics
from backend.services.validator import validate_and_create_document, get_assignment_topic, determine_notification_priority
from backend.db.json_store import get_store

client = TestClient(app)

def test_dynamic_topic_extraction():
    """Kiểm tra khả năng nhận diện topic động cho mọi Lab N, Quiz N, Checkpoint N"""
    assert get_assignment_topic("Nộp bài Lab 3: RAG") == "lab-3"
    assert get_assignment_topic("Gia hạn Quiz 2") == "quiz-2"
    assert get_assignment_topic("Checkpoint 3 Hackathon") == "checkpoint-3"
    assert get_assignment_topic("Mini Hackathon CP4 nộp link") == "hackathon-cp4"
    assert get_assignment_topic("Hướng dẫn Capstone Project cuối kỳ") == "capstone"
    assert get_assignment_topic("Buổi Seminar về AI Agents") == "seminar"
    assert get_assignment_topic("Chat linh tinh không có bài tập") is None

def test_notification_priority_p0_urgent():
    """Kiểm tra tin nhắn khẩn cấp / gia hạn sát giờ được gán P0"""
    event = DiscordRawEvent(
        t="MESSAGE_CREATE",
        d=RawMessageData(
            id="msg_test_p0_01",
            guild_id="123456789012345678",
            channel_id="chan_announcements",
            author=RawAuthor(id="1029384756", username="Thầy Hoàng"),
            content="Thông báo khẩn cấp: Do sự cố kỹ thuật form, gia hạn Lab 2 thêm 2 tiếng đến 02:00 sáng mai 18/09/2026",
            timestamp="2026-09-17T22:00:00.000Z",
            mention_everyone=True
        )
    )
    passed, reason, ai_in = filter_and_route(event)
    assert passed is True
    assert ai_in is not None

    ai_out = extract_semantics(ai_in)
    assert ai_out.classification.type == "DEADLINE"
    assert ai_out.classification.importance == "HIGH"

    valid, v_reason, doc = validate_and_create_document(ai_in, ai_out)
    assert valid is True
    assert doc is not None
    assert doc.system.notification_priority == "P0"
    assert doc.system.topic_key == "lab-2"

def test_notification_priority_p1_new_assignment():
    """Kiểm tra công bố bài tập mới được gán P1 (Quan trọng)"""
    event = DiscordRawEvent(
        t="MESSAGE_CREATE",
        d=RawMessageData(
            id="msg_test_p1_01",
            guild_id="123456789012345678",
            channel_id="chan_lab_assignments",
            author=RawAuthor(id="1029384756", username="Thầy Hoàng"),
            content="Công bố bài tập Lab 3: RAG with Vector DB. Hạn nộp là 23:59 ngày 24/09/2026 qua form nộp bài.",
            timestamp="2026-09-17T15:00:00.000Z"
        )
    )
    passed, reason, ai_in = filter_and_route(event)
    assert passed is True

    ai_out = extract_semantics(ai_in)
    assert ai_out.classification.type == "DEADLINE"

    valid, v_reason, doc = validate_and_create_document(ai_in, ai_out)
    assert valid is True
    assert doc.system.notification_priority == "P1"
    assert doc.system.topic_key == "lab-3"

def test_notification_priority_p1_meeting():
    """Kiểm tra lịch họp mới được gán P1, có start_time và deadline = None (Zero-hallucination)"""
    event = DiscordRawEvent(
        t="MESSAGE_CREATE",
        d=RawMessageData(
            id="msg_test_meet_01",
            guild_id="123456789012345678",
            channel_id="chan_announcements",
            author=RawAuthor(id="1029384756", username="ThayDong_Tech"),
            content="@everyone Lịch họp chốt tiến độ dự án AI diễn ra lúc 20:00 ngày mai. Link meet: https://meet.google.com/abc-xyz",
            timestamp="2026-09-17T14:00:00.000Z",
            mention_everyone=True
        )
    )
    passed, reason, ai_in = filter_and_route(event)
    assert passed is True

    ai_out = extract_semantics(ai_in)
    assert ai_out.classification.type == "MEETING"
    assert ai_out.schedule.start_time is not None
    assert ai_out.schedule.deadline is None
    assert ai_out.schedule.end_time is None

    valid, v_reason, doc = validate_and_create_document(ai_in, ai_out)
    assert valid is True
    assert doc.system.notification_priority == "P1"

def test_announcements_channel_always_passes_for_whitelisted_author():
    """Kiểm tra Giảng viên đăng trong #announcements luôn được duyệt dù không có từ khóa deadline (P2 Thông báo thường)"""
    event = DiscordRawEvent(
        t="MESSAGE_CREATE",
        d=RawMessageData(
            id="msg_test_p2_ann_01",
            guild_id="123456789012345678",
            channel_id="chan_announcements",
            author=RawAuthor(id="1029384756", username="Thầy Hoàng"),
            content="Các bạn chú ý chuẩn bị trước môi trường Colab và đọc kỹ tài liệu phần Attention trước buổi học tới.",
            timestamp="2026-09-17T10:00:00.000Z"
        )
    )
    passed, reason, ai_in = filter_and_route(event)
    assert passed is True
    assert "always pass" in reason or "Whitelisted" in reason

def test_student_chitchat_is_filtered_out():
    """Kiểm tra tin nhắn chat của học viên bị lọc bỏ hoặc không tạo thông báo can thiệp"""
    event = DiscordRawEvent(
        t="MESSAGE_CREATE",
        d=RawMessageData(
            id="msg_test_chat_01",
            guild_id="123456789012345678",
            channel_id="chan_lab_assignments",
            author=RawAuthor(id="999888777", username="Lan Anh"),
            content="Mọi người ơi cho mình hỏi notebook chạy trên Colab Free có bị ngắt kết nối không?",
            timestamp="2026-09-17T10:05:00.000Z"
        )
    )
    passed, reason, ai_in = filter_and_route(event)
    assert passed is False
    assert "Bỏ qua" in reason or "không chứa tín hiệu" in reason

def test_topic_deduplication_in_json_store():
    """Kiểm tra lưu 2 event cùng topic_key -> bản cũ tự động chuyển SUPERSEDED"""
    store = get_store()

    # Tạo event Lab 4 lần 1
    ev1 = DiscordRawEvent(
        t="MESSAGE_CREATE",
        d=RawMessageData(
            id="test_dedup_01",
            guild_id="123456789012345678",
            channel_id="chan_announcements",
            author=RawAuthor(id="1029384756", username="Thầy Hoàng"),
            content="Thông báo: Hạn nộp bài Lab 4 là 23:59 ngày 30/09/2026",
            timestamp="2026-09-17T10:00:00.000Z"
        )
    )
    _, _, ai_in1 = filter_and_route(ev1)
    ai_out1 = extract_semantics(ai_in1)
    _, _, doc1 = validate_and_create_document(ai_in1, ai_out1)
    assert doc1.id == "evt_test_dedup_01"
    assert doc1.system.status == "PROCESSED"

    # Tạo event Lab 4 lần 2 (gia hạn)
    ev2 = DiscordRawEvent(
        t="MESSAGE_CREATE",
        d=RawMessageData(
            id="test_dedup_02",
            guild_id="123456789012345678",
            channel_id="chan_announcements",
            author=RawAuthor(id="1029384756", username="Thầy Hoàng"),
            content="Gia hạn nộp bài Lab 4 thêm 1 ngày đến 23:59 ngày 01/10/2026",
            timestamp="2026-09-17T12:00:00.000Z"
        )
    )
    _, _, ai_in2 = filter_and_route(ev2)
    ai_out2 = extract_semantics(ai_in2)
    _, _, doc2 = validate_and_create_document(ai_in2, ai_out2)
    assert doc2.id == "evt_test_dedup_02"
    assert doc2.system.status == "PROCESSED"

    # Bản cũ doc1 phải tự động chuyển thành SUPERSEDED
    old_doc = store.get_by_id("evt_test_dedup_01")
    assert old_doc is not None
    assert old_doc.system.status == "SUPERSEDED"

def test_full_fastapi_webhook_notification_pipeline():
    """Kiểm tra toàn bộ pipeline qua endpoint POST /events/discord trả về đúng cấu trúc notification mới"""
    payload = {
        "t": "MESSAGE_CREATE",
        "d": {
            "id": "webhook_test_msg_999",
            "guild_id": "123456789012345678",
            "channel_id": "chan_announcements",
            "author": {
                "id": "1029384756",
                "username": "Thầy Hoàng"
            },
            "content": "@everyone Thông báo: Mở Quiz 2 hạn nộp 21:00 ngày 26/09/2026 trên VLearn",
            "timestamp": "2026-09-17T16:00:00.000Z",
            "mention_everyone": True
        }
    }
    res = client.post("/events/discord", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "PROCESSED"
    doc = data["saved_document"]
    assert doc["system"]["notification_priority"] == "P1"
    assert doc["system"]["topic_key"] == "quiz-2"
    assert "discord_payload" in data
    assert "ui_view_model" in data

def test_persistence_channels_endpoints():
    """Kiểm tra API lưu trữ tin nhắn từng channel vào data/channels/*.json"""
    # 1. Test GET /channels
    res = client.get("/channels")
    assert res.status_code == 200
    all_channels = res.json()
    assert isinstance(all_channels, dict)

    # 2. Test POST /channels/{channel_name}/messages
    test_msg = {
        "id": "test_persist_msg_001",
        "channel": "announcements",
        "author": {"name": "Thầy Hoàng", "role": "Giảng viên", "avatar": "TH", "type": "teacher"},
        "content": "Tin nhắn kiểm tra tính bền vững dữ liệu khi F5 reload.",
        "timestamp": "12:00 · Hôm nay",
        "type": "chat"
    }
    post_res = client.post("/channels/announcements/messages", json=test_msg)
    assert post_res.status_code == 200
    saved = post_res.json()
    assert saved["id"] == "test_persist_msg_001"

    # 3. Test GET /channels/{channel_name}/messages
    get_res = client.get("/channels/announcements/messages")
    assert get_res.status_code == 200
    msg_list = get_res.json()
    assert any(m.get("id") == "test_persist_msg_001" for m in msg_list)

def test_persistence_deadlines_endpoints():
    """Kiểm tra API lưu trữ deadlines vào data/deadlines.json khi admin hoặc AI thêm mới"""
    # 1. Test GET /deadlines
    res = client.get("/deadlines")
    assert res.status_code == 200
    deadlines = res.json()
    assert isinstance(deadlines, list)

    # 2. Test POST /deadlines (Admin thêm thủ công)
    manual_dl = {
        "id": "manual_test_dl_001",
        "assignment_code": "manual_test_dl_001",
        "title": "Báo cáo tiến độ đồ án AI",
        "due_date": "2026-09-22",
        "due_time": "23:59",
        "iso_deadline": "2026-09-22T23:59:00+07:00",
        "source_channel": "#announcements",
        "author_name": "Admin BTC",
        "quote": "Báo cáo nộp qua form trước 23:59 ngày 22/09/2026"
    }
    post_res = client.post("/deadlines", json=manual_dl)
    assert post_res.status_code == 200

    # 3. Test GET /deadlines lại để đảm bảo đã lưu bền vững
    get_res = client.get("/deadlines")
    assert get_res.status_code == 200
    updated_deadlines = get_res.json()
    assert any(d.get("assignment_code") == "manual_test_dl_001" or d.get("id") == "manual_test_dl_001" for d in updated_deadlines)

