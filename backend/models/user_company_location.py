from sqlalchemy import Column, Integer, ForeignKey
from database import Base

class UserCompanyLocation(Base):
    __tablename__ = "user_company_location"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    company_id = Column(Integer, ForeignKey("companies.id"))
    location_id = Column(Integer, ForeignKey("locations.id"))
