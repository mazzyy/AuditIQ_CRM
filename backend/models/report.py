# backend/models/report.py

from sqlalchemy import Column, Integer, String, ForeignKey, Enum, Date
from database import Base
import enum

class StatusEnum(str, enum.Enum):
    draft = "draft"
    submitted = "submitted"
    approved = "approved"
    rejected = "rejected"

class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    location_id = Column(Integer, ForeignKey("locations.id"))
    report_name = Column(String(200))
    report_date = Column(Date)
    submitted_by = Column(String(100))
    status = Column(Enum(StatusEnum))
    score = Column(Integer)
