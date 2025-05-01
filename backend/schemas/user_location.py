from pydantic import BaseModel

class UserLocationBase(BaseModel):
    user_id: int
    location_id: int

class UserLocationCreate(UserLocationBase):
    pass

class UserLocation(UserLocationBase):
    id: int

    class Config:
        from_attributes  = True
