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
    submitted_by: str
    status: StatusEnum
    score: int

class ReportCreate(ReportBase):
    pass

class Report(ReportBase):
    id: int

    class Config:
        orm_mode = True
