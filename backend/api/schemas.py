from pydantic import BaseModel
from typing import Optional
from .enums import Light, Water
from datetime import datetime

class PlantRequest(BaseModel):
    common_name: str
    botanical_name: Optional[str] = None
    nickname: Optional[str] = None
    location: Optional[str] = None
    light_needs: Optional[Light] = None
    watering_frequency: Optional[Water] = None
    notes: Optional[str] = None
    image_id: Optional[str] = None
    user_id: Optional[str] = None

class PlantResponse(PlantRequest):
    id: str
    created_at: datetime