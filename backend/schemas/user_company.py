from pydantic import BaseModel

class UserCompanyBase(BaseModel):
    user_id: int
    company_id: int

class UserCompanyCreate(UserCompanyBase):
    pass

class UserCompany(UserCompanyBase):
    id: int

    class Config:
        orm_mode = True
