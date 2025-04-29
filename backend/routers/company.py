# backend/routers/company.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from crud import company as company_crud
from schemas import company as company_schema
from database import SessionLocal

router = APIRouter(
    prefix="/companies",
    tags=["Companies"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=company_schema.Company)
def create_company(company: company_schema.CompanyCreate, db: Session = Depends(get_db)):
    return company_crud.create_company(db=db, company=company)

@router.get("/", response_model=list[company_schema.Company])
def read_companies(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return company_crud.get_companies(db=db, skip=skip, limit=limit)

@router.get("/{company_id}", response_model=company_schema.Company)
def read_company(company_id: int, db: Session = Depends(get_db)):
    db_company = company_crud.get_company(db=db, company_id=company_id)
    if db_company is None:
        raise HTTPException(status_code=404, detail="Company not found")
    return db_company
