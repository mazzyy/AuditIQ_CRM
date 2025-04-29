from pydantic import BaseModel

class UserCompanyLocationBase(BaseModel):
    user_id: int
    company_id: int
    location_id: int

class UserCompanyLocationCreate(UserCompanyLocationBase):
    pass

class UserCompanyLocation(UserCompanyLocationBase):
    id: int

    class Config:
        orm_mode = True
