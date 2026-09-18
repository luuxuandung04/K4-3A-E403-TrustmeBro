from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional

# --- UI View Model (Aggregator Output) ---
class PeriodInfo(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    type: str = "WEEK"
    from_date: str = Field(alias="from")
    to_date: str = Field(alias="to")

class AggregatedItem(BaseModel):
    type: str
    date: str
    time: str
    title: str
    source_url: str

class AggregatedViewModel(BaseModel):
    period: PeriodInfo
    items: List[AggregatedItem]


# --- Discord API: UI Payload ---
class DiscordEmbedField(BaseModel):
    name: str
    value: str
    inline: bool = False

class DiscordEmbedFooter(BaseModel):
    text: str = "AI Assistant • Tự động tổng hợp từ Discord"

class DiscordEmbed(BaseModel):
    title: str
    description: str
    color: Optional[int] = None
    fields: List[DiscordEmbedField] = []
    footer: DiscordEmbedFooter = DiscordEmbedFooter()

class DiscordButton(BaseModel):
    type: int = 2
    style: int = 5  # Link button
    label: str
    url: str

class DiscordActionRow(BaseModel):
    type: int = 1
    components: List[DiscordButton]

class DiscordAllowedMentions(BaseModel):
    parse: List[str] = []

class DiscordPayload(BaseModel):
    content: str
    embeds: List[DiscordEmbed]
    components: List[DiscordActionRow] = []
    allowed_mentions: DiscordAllowedMentions = DiscordAllowedMentions()
