from sqlalchemy import Column, Integer, ForeignKey
from database import Base

class UserCompany(Base):
    __tablename__ = "user_company"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    company_id = Column(Integer, ForeignKey("company_store.id"))
