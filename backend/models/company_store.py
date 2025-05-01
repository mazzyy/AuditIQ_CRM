from sqlalchemy import Column, Integer, String
from database import Base

class CompanyStore(Base):
    __tablename__ = "company_store"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150))
