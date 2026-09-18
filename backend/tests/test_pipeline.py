# coding: utf-8
import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.models.discord_raw import DiscordRawEvent, RawMessageData, RawAuthor
from backend.services.filter_router import filter_and_route
from backend.services.ai_extractor import extract_semantics
from backend.services.validator import validate_and_create_document
from backend.services.aggregator import aggregate_events
from backend.services.discord_formatter import format_discord_payload
from backend.db.json_store import get_store

client = TestClient(app)

SAMPLE_MEETING_EVENT = DiscordRawEvent(
    t="MESSAGE_CREATE",
    d=RawMessageData(
        id="1152837492837462",
        guild_id="123456789012345678",
        channel_id="99887766554433",
        author=RawAuthor(id="1029384756", username="ThayDong_Tech"),
        content="@everyone Chào các bạn, ngày mai chúng ta có lịch họp online lúc 20:00 để chốt tiến độ dự án AI nhé. Link meet mình sẽ gửi sau.",
        timestamp="2026-09-17T14:19:00.000Z",
        mention_everyone=True
    )
)

def test_step1_to_step2_filter():
    passed, reason, ai_in = filter_and_route(SAMPLE_MEETING_EVENT)
    assert passed is True
    assert ai_in is not None
    assert ai_in.context.timezone == "Asia/Ho_Chi_Minh"
    assert ai_in.message.message_id == "1152837492837462"
    assert ai_in.message.author.name == "ThayDong_Tech"
    assert "https://discord.com/channels/" in ai_in.message.message_url

def test_step3_ai_extraction_semantics():
    _, _, ai_in = filter_and_route(SAMPLE_MEETING_EVENT)
    ai_out = extract_semantics(ai_in)

    assert ai_out.classification.type == "MEETING"
    assert ai_out.classification.importance in ["HIGH", "NORMAL"]
    assert "Họp" in ai_out.content.title
    # Zero hallucination checks
    assert ai_out.schedule.start_time is not None
    assert ai_out.schedule.end_time is None
    assert ai_out.schedule.deadline is None
    assert ai_out.schedule.time_precision == "START_TIME_ONLY"

def test_step4_validator_and_storage():
    _, _, ai_in = filter_and_route(SAMPLE_MEETING_EVENT)
    ai_out = extract_semantics(ai_in)
    valid, reason, doc = validate_and_create_document(ai_in, ai_out)

    assert valid is True
    assert doc is not None
    assert doc.id == "evt_1152837492837462"
    assert doc.source.message_url == ai_in.message.message_url
    assert doc.system.status == "PROCESSED"

    # Check persistence
    store = get_store()
    retrieved = store.get_by_id(doc.id)
    assert retrieved is not None
    assert retrieved.content.title == doc.content.title

def test_step5_aggregator():
    view_model = aggregate_events()
    assert len(view_model.items) >= 1
    assert view_model.period.type == "WEEK"
    for item in view_model.items:
        assert item.date is not None
        assert item.time is not None
        assert item.source_url.startswith("https://discord.com/channels/")

def test_step6_discord_formatter():
    view_model = aggregate_events()
    payload = format_discord_payload(view_model)

    assert "TỔNG HỢP THÔNG TIN" in payload.content
    assert len(payload.embeds) == 1
    assert len(payload.embeds[0].fields) >= 1
    assert len(payload.components) == 1
    assert len(payload.components[0].components) >= 1
    assert payload.allowed_mentions.parse == []

def test_fastapi_webhook_full_pipeline():
    response = client.post("/events/discord", json=SAMPLE_MEETING_EVENT.model_dump())
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "PROCESSED"
    assert "saved_document" in data
    assert "discord_payload" in data
    assert data["saved_document"]["_id"] == "evt_1152837492837462"

    source_history = client.get("/channels/dự-án-ai/messages")
    assert source_history.status_code == 200
    assert any(
        message["id"] == SAMPLE_MEETING_EVENT.d.id
        for message in source_history.json()
    )

def test_fastapi_schedule_digest():
    response = client.get("/schedule/digest")
    assert response.status_code == 200
    data = response.json()
    assert "view_model" in data
    assert "discord_payload" in data
    assert len(data["discord_payload"]["embeds"]) == 1

def test_urgent_extension_updates_data():
    urgent_payload = DiscordRawEvent(
        t="MESSAGE_CREATE",
        d=RawMessageData(
            id="test_urgent_msg_001",
            guild_id="123456789012345678",
            channel_id="chan_announcements",
            author=RawAuthor(id="1029384756", username="ThayHoang_GV"),
            content="Thông báo khẩn cấp lớp 3A: Do sự cố nộp bài, Thầy gia hạn nộp bài Lab 2 thêm 2 tiếng đến 02:00 sáng mai 18/09/2026. Link nộp bài giữ nguyên: https://forms.gle/lab2-submit-k4",
            timestamp="2026-09-17T22:00:00.000Z",
            mention_everyone=True
        )
    )
    res = client.post("/events/discord", json=urgent_payload.model_dump())
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "PROCESSED"

    # Check old Lab 2 event is marked SUPERSEDED
    store = get_store()
    old_doc = store.get_by_id("evt_lab-2")
    if old_doc:
        assert old_doc.system.status == "SUPERSEDED"
