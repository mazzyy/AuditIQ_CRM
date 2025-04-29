from pydantic import BaseModel
from enum import Enum

class RoleEnum(str, Enum):
    admin = "admin"
    auditor = "auditor"
    manager = "manager"

class UserBase(BaseModel):
    name: str
    email: str
    role: RoleEnum

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int

    class Config:
        orm_mode = True
