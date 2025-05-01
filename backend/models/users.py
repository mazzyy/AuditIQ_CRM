from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum as SQLAEnum
from datetime import datetime
from database import Base
import enum

class RoleEnum(str, enum.Enum):
    superuser = "superuser"
    admin = "admin"
    auditor = "auditor"
    manager = "manager"
    trial = "trial"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    phone_number = Column(String(20), nullable=True)
    theme = Column(Boolean, default=False)
    role = Column(SQLAEnum(RoleEnum), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
