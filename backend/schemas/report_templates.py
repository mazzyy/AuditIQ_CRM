from pydantic import BaseModel
from datetime import datetime
from typing import Any

class ReportTemplateBase(BaseModel):
    name: str
    description: str
    content: Any  # JSON field

class ReportTemplateCreate(ReportTemplateBase):
    pass

class ReportTemplate(ReportTemplateBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes  = True
