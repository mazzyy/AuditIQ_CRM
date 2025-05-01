from pydantic import BaseModel

class LocationBase(BaseModel):
    company_id: int
    location_name: str
    address: str
    tags: str

class LocationCreate(LocationBase):
    pass

class Location(LocationBase):
    id: int

    class Config:
        from_attributes  = True
