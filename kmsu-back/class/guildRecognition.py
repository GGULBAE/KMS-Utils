from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel

class guildRecognition(BaseModel):
  URLArray: list[str] = []
