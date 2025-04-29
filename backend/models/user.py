from sqlalchemy import Column, Integer, String, Enum
from database import Base
import enum

class RoleEnum(str, enum.Enum):
    admin = "admin"
    auditor = "auditor"
    manager = "manager"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(255), unique=True, index=True)
    role = Column(Enum(RoleEnum))
