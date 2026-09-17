# coding: utf-8
from datetime import datetime
from typing import List
from backend.models.discord_payload import (
    AggregatedViewModel, DiscordPayload, DiscordEmbed, DiscordEmbedField,
    DiscordEmbedFooter, DiscordActionRow, DiscordButton, DiscordAllowedMentions
)

DOW_VN = [
    "THỨ HAI", "THỨ BA", "THỨ TƯ", "THỨ NĂM",
    "THỨ SÁU", "THỨ BẢY", "CHỦ NHẬT"
]

TYPE_META = {
    "CLASS": {"header_icon": "📚", "body_icon": "💻", "label": "Lớp học"},
    "MEETING": {"header_icon": "🤝", "body_icon": "🤖", "label": "Họp online"},
    "DEADLINE": {"header_icon": "⚠️", "body_icon": "📝", "label": "Deadline"},
    "ANNOUNCEMENT": {"header_icon": "📢", "body_icon": "📌", "label": "Thông báo"},
    "OTHER": {"header_icon": "🗓️", "body_icon": "🔹", "label": "Sự kiện"}
}

def format_discord_payload(view_model: AggregatedViewModel, hub_url: str = "https://discord.com/channels/123456789012345678/chan_deadline_hub") -> DiscordPayload:
    """
    Transforms UI View Model into a Discord API UI Payload
    following Discord's official Embed and Components V2 format.
    """
    p_from = view_model.period.from_date
    p_to = view_model.period.to_date
    
    # Format date display: DD/MM
    try:
        from_dt = datetime.strptime(p_from, "%Y-%m-%d")
        to_dt = datetime.strptime(p_to, "%Y-%m-%d")
        from_display = from_dt.strftime("%d/%m")
        to_display = to_dt.strftime("%d/%m")
    except Exception:
        from_display = p_from
        to_display = p_to

    content_header = f"📢 **TỔNG HỢP THÔNG TIN TUẦN {from_display} → {to_display}**"
    
    fields: List[DiscordEmbedField] = []
    buttons: List[DiscordButton] = [
        DiscordButton(
            type=2,
            style=5,
            label="📅 Xem lịch tuần",
            url=hub_url
        )
    ]

    for item in view_model.items:
        meta = TYPE_META.get(item.type, TYPE_META["OTHER"])
        try:
            item_dt = datetime.strptime(item.date, "%Y-%m-%d")
            dow_str = DOW_VN[item_dt.weekday()]
            day_str = item_dt.strftime("%d/%m")
        except Exception:
            dow_str = "HÔM NAY"
            day_str = item.date

        field_name = f"{meta['header_icon']} {dow_str} — {day_str}"
        prefix = f"{meta['body_icon']} Deadline: " if item.type == "DEADLINE" else f"{meta['body_icon']} "
        summary_line = f"\nℹ️ *{item.summary[:80]}*" if hasattr(item, 'summary') and item.summary and item.summary != item.title else ""
        field_value = f"🕐 **{item.time}**\n{prefix}{item.title}{summary_line}\n[# Xem nguồn]({item.source_url})"

        fields.append(DiscordEmbedField(
            name=field_name,
            value=field_value,
            inline=False
        ))

        # Add up to 4 additional link buttons
        if len(buttons) < 5 and item.source_url:
            clean_label = item.title[:20]
            if item.type == "MEETING":
                btn_label = f"🔗 Tin họp {clean_label.replace('Họp', '').strip()[:10]}"
            elif item.type == "DEADLINE":
                btn_label = f"🔗 Nộp {clean_label[:14]}"
            else:
                btn_label = f"🔗 {clean_label[:16]}"
            
            buttons.append(DiscordButton(
                type=2,
                style=5,
                label=btn_label,
                url=item.source_url
            ))

    embed = DiscordEmbed(
        title="📅 Lịch học & thông tin quan trọng",
        description="Các hoạt động và thông báo quan trọng dành cho học viên trong tuần này.",
        color=0x5865F2,  # Blurple Discord color
        fields=fields,
        footer=DiscordEmbedFooter(text="AI Assistant • Tự động tổng hợp từ Discord")
    )

    action_row = DiscordActionRow(type=1, components=buttons)

    return DiscordPayload(
        content=content_header,
        embeds=[embed],
        components=[action_row],
        allowed_mentions=DiscordAllowedMentions(parse=[])
    )
