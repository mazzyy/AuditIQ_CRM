from sqlalchemy import Column, Integer, ForeignKey
from database import Base

class UserLocation(Base):
    __tablename__ = "user_location"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    location_id = Column(Integer, ForeignKey("locations.id"))
