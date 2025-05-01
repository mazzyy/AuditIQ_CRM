from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class MediaFileBase(BaseModel):
    user_id: int
    company_id: Optional[int] = None
    name: str
    file_url: str

class MediaFileCreate(MediaFileBase):
    pass

class MediaFile(MediaFileBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes  = True
