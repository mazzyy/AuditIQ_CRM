from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from database import Base
from datetime import datetime

class MediaFile(Base):
    __tablename__ = "media_files"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    company_id = Column(Integer, ForeignKey("company_store.id"), nullable=True)
    name = Column(String(200))
    file_url = Column(String(500))
    created_at = Column(DateTime, default=datetime.utcnow)
