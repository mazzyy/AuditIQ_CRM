from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import SessionLocal

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

@router.post("/", response_model=schemas.company.Company)
def create_company(company: schemas.company.CompanyCreate, db: Session = Depends(get_db)):
    return crud.company.create_company(db=db, company=company)

@router.get("/", response_model=list[schemas.company.Company])
def read_companies(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.company.get_companies(db=db, skip=skip, limit=limit)

@router.get("/{company_id}", response_model=schemas.company.Company)
def read_company(company_id: int, db: Session = Depends(get_db)):
    db_company = crud.company.get_company(db=db, company_id=company_id)
    if db_company is None:
        raise HTTPException(status_code=404, detail="Company not found")
    return db_company
