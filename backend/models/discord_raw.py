# coding: utf-8
from pydantic import BaseModel, Field
from typing import Optional

class RawAuthor(BaseModel):
    id: str
    username: str

class RawMessageData(BaseModel):
    id: str
    guild_id: str
    channel_id: str
    author: RawAuthor
    content: str
    timestamp: str
    mention_everyone: bool = False

class DiscordRawEvent(BaseModel):
    t: str = "MESSAGE_CREATE"
    d: RawMessageData
