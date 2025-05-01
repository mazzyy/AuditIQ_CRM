from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from crud import company_store as company_crud
from schemas import company_store as company_schema
from database import get_db

router = APIRouter(
    prefix="/company-store",
    tags=["CompanyStore"],
)

@router.post("/", response_model=company_schema.CompanyStore)
def create_company(company: company_schema.CompanyStoreCreate, db: Session = Depends(get_db)):
    return company_crud.create_company(db, company)

@router.get("/", response_model=list[company_schema.CompanyStore])
def get_companies(db: Session = Depends(get_db)):
    return company_crud.get_companies(db)

@router.get("/{company_id}", response_model=company_schema.CompanyStore)
def get_company(company_id: int, db: Session = Depends(get_db)):
    company = company_crud.get_company(db, company_id)
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return company

@router.put("/{company_id}", response_model=company_schema.CompanyStore)
def update_company(company_id: int, company: company_schema.CompanyStoreCreate, db: Session = Depends(get_db)):
    updated = company_crud.update_company(db, company_id, company)
    if not updated:
        raise HTTPException(status_code=404, detail="Company not found")
    return updated

@router.delete("/{company_id}")
def delete_company(company_id: int, db: Session = Depends(get_db)):
    success = company_crud.delete_company(db, company_id)
    if not success:
        raise HTTPException(status_code=404, detail="Company not found")
    return {"detail": "Company deleted successfully"}
