# coding: utf-8
import re
from datetime import datetime
from typing import Tuple, Optional
import pytz
from backend.config import (
    DEFAULT_TIMEZONE, WHITELIST_CHANNELS, WHITELIST_AUTHORS, KEYWORD_SIGNALS
)
from backend.models.discord_raw import DiscordRawEvent
from backend.models.ai_io import AIInput, AIContext, AIMessage, AIMessageAuthor

TIME_REGEX = re.compile(
    r'(\b\d{1,2}[:h]\d{2}\b)|'
    r'(\b\d{1,2}/\d{1,2}(/\d{2,4})?\b)|'
    r'(ngày\s+mai|hôm\s+nay|tối\s+nay|sáng\s+mai|chiều\s+mai|tuần\s+này|tuần\s+sau)|'
    r'(thứ\s+[hai|ba|tư|năm|sáu|bảy|2|3|4|5|6|7]|chủ\s+nhật)',
    re.IGNORECASE
)

def filter_and_route(raw_event: DiscordRawEvent) -> Tuple[bool, Optional[str], Optional[AIInput]]:
    """
    Candidate Gate / Whitelist Router:
    Filters out noise before sending to AI to conserve tokens and reduce false positives.
    Returns:
        (is_passed, reason, ai_input_payload)
    """
    msg_data = raw_event.d
    content = (msg_data.content or "").strip()
    author_name = msg_data.author.username
    channel_id = msg_data.channel_id
    
    # 1. Quick check: Empty content
    if not content:
        return False, "Nội dung tin nhắn trống", None

    content_lower = content.lower()

    # 2. Check channel name or id
    channel_name = WHITELIST_CHANNELS.get(channel_id, f"channel-{channel_id[-4:] if len(channel_id)>=4 else channel_id}")
    
    # 3. Check author authority — Strict Authority Gate!
    is_author_whitelisted = any(wh.lower() in author_name.lower() for wh in WHITELIST_AUTHORS)
    if not is_author_whitelisted:
        return False, f"Bỏ qua: Tác giả '{author_name}' không có thẩm quyền ban hành deadline/lịch họp (Sinh viên/ngoài whitelist)", None
    
    # 4. Check keyword signals
    has_keyword = any(kw in content_lower for kw in KEYWORD_SIGNALS)
    has_time_signal = bool(TIME_REGEX.search(content_lower))
    has_mention_everyone = msg_data.mention_everyone or "@everyone" in content or "@here" in content

    # Decision Rule for Authorized Authors:
    passes = False
    pass_reason = ""

    is_announcements_channel = "announcements" in channel_name.lower() or "ann" in channel_id.lower()

    if is_announcements_channel:
        passes = True
        pass_reason = f"Whitelisted author '{author_name}' in #announcements (always pass)"
    elif has_keyword or has_time_signal or has_mention_everyone:
        passes = True
        pass_reason = f"Whitelisted author '{author_name}' with event signals"
    elif any(urgent_kw in content_lower for urgent_kw in ["gia hạn", "dời hạn", "hạn nộp", "lịch họp"]):
        passes = True
        pass_reason = "Explicit high-priority keyword detected"
    elif len(content) > 50:
        passes = True
        pass_reason = f"Whitelisted author '{author_name}' with substantial content (P2/P3)"

    if not passes:
        return False, "Tin nhắn không chứa tín hiệu sự kiện/deadline (Bỏ qua để tiết kiệm token)", None

    # Construct clean AIInput (JSON 2)
    tz = pytz.timezone(DEFAULT_TIMEZONE)
    now = datetime.now(tz)
    current_dt_str = now.isoformat(timespec="seconds")

    message_url = f"https://discord.com/channels/{msg_data.guild_id}/{msg_data.channel_id}/{msg_data.id}"

    ai_input = AIInput(
        context=AIContext(
            current_datetime=current_dt_str,
            timezone=DEFAULT_TIMEZONE
        ),
        message=AIMessage(
            guild_id=msg_data.guild_id,
            channel_id=msg_data.channel_id,
            channel_name=channel_name,
            message_id=msg_data.id,
            author=AIMessageAuthor(
                id=msg_data.author.id,
                name=author_name
            ),
            content=content,
            timestamp=msg_data.timestamp,
            message_url=message_url
        )
    )

    return True, pass_reason, ai_input
