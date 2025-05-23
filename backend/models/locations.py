from sqlalchemy import Column, Integer, String, Text, ForeignKey
from database import Base

class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("company_store.id"))
    location_name = Column(String(150))
    address = Column(Text)
    tags = Column(String(200))
