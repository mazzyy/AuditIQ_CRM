from pydantic import BaseModel
from enum import Enum
from datetime import date

class StatusEnum(str, Enum):
    draft = "draft"
    submitted = "submitted"
    approved = "approved"
    rejected = "rejected"

class ReportBase(BaseModel):
    company_id: int
    user_id: int
    location_id: int
    report_name: str
    report_date: date
    status: StatusEnum
    report_score: int
    file_url: str

class ReportCreate(ReportBase):
    pass

class Report(ReportBase):
    id: int

    class Config:
        from_attributes  = True
