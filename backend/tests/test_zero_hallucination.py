# coding: utf-8
import pytest
from backend.models.discord_raw import DiscordRawEvent, RawMessageData, RawAuthor
from backend.services.filter_router import filter_and_route
from backend.services.ai_extractor import extract_semantics

def test_meeting_without_end_time_must_have_null_end_time():
    """AI must NEVER hallucinate end_time when only start_time is given"""
    raw = DiscordRawEvent(
        t="MESSAGE_CREATE",
        d=RawMessageData(
            id="test_msg_01",
            guild_id="123",
            channel_id="99887766554433",
            author=RawAuthor(id="auth_01", username="ThayDong_Tech"),
            content="Ngày mai họp lúc 20:00 nhé các bạn.",
            timestamp="2026-09-17T14:00:00.000Z"
        )
    )
    passed, _, ai_in = filter_and_route(raw)
    assert passed is True
    ai_out = extract_semantics(ai_in)
    
    assert ai_out.classification.type == "MEETING"
    assert ai_out.schedule.start_time is not None
    assert ai_out.schedule.end_time is None, "AI must not invent end_time!"
    assert ai_out.schedule.deadline is None, "A meeting must not have a deadline!"

def test_deadline_without_start_time_must_have_null_start_time():
    """Assignment deadline must have deadline field populated, start_time must be null"""
    raw = DiscordRawEvent(
        t="MESSAGE_CREATE",
        d=RawMessageData(
            id="test_msg_02",
            guild_id="123",
            channel_id="chan_announcements",
            author=RawAuthor(id="auth_02", username="Thầy Hoàng"),
            content="Gia hạn nộp bài Lab 2 đến 23:59 ngày 17/09/2026.",
            timestamp="2026-09-15T14:00:00.000Z"
        )
    )
    passed, _, ai_in = filter_and_route(raw)
    assert passed is True
    ai_out = extract_semantics(ai_in)
    
    assert ai_out.classification.type == "DEADLINE"
    assert ai_out.schedule.deadline is not None
    assert "2026-09-17T23:59:00" in ai_out.schedule.deadline
    assert ai_out.schedule.start_time is None

def test_chitchat_rejected_before_calling_ai():
    """Chatter without signals is rejected at candidate gate, zero AI tokens spent"""
    raw = DiscordRawEvent(
        t="MESSAGE_CREATE",
        d=RawMessageData(
            id="test_msg_03",
            guild_id="123",
            channel_id="chan_lab_assignments",
            author=RawAuthor(id="auth_03", username="LanAnh_Student"),
            content="Trưa nay có ai đi ăn cơm tấm ở canteen không?",
            timestamp="2026-09-17T11:30:00.000Z"
        )
    )
    passed, reason, ai_in = filter_and_route(raw)
    assert passed is False
    assert ai_in is None
    assert "Bỏ qua" in reason or "không chứa tín hiệu" in reason
