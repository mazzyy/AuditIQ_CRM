from sqlalchemy import Column, Integer, String, Boolean, Enum, DateTime
from database import Base
import enum
from datetime import datetime

class RoleEnum(str, enum.Enum):
    admin = "admin"
    auditor = "auditor"
    manager = "manager"
    trial = "trial"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100))
    last_name = Column(String(100))
    email = Column(String(255), unique=True, index=True)
    password_hash = Column(String(255))
    phone_number = Column(String(20))
    theme = Column(Boolean, default=False)
    role = Column(Enum(RoleEnum))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
