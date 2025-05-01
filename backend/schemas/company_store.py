from pydantic import BaseModel

class CompanyStoreBase(BaseModel):
    name: str

class CompanyStoreCreate(CompanyStoreBase):
    pass

class CompanyStore(CompanyStoreBase):
    id: int

    class Config:
        from_attributes  = True
