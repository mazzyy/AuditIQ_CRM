from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from crud import user_company as uc_crud
from schemas import user_company as uc_schema
from database import get_db

router = APIRouter(
    prefix="/user-company",
    tags=["UserCompany"],
)

@router.post("/", response_model=uc_schema.UserCompany)
def create_user_company(uc: uc_schema.UserCompanyCreate, db: Session = Depends(get_db)):
    return uc_crud.create_user_company(db, uc)

@router.get("/", response_model=list[uc_schema.UserCompany])
def get_all_user_companies(db: Session = Depends(get_db)):
    return uc_crud.get_user_companies(db)

@router.get("/{uc_id}", response_model=uc_schema.UserCompany)
def get_user_company(uc_id: int, db: Session = Depends(get_db)):
    record = uc_crud.get_user_company(db, uc_id)
    if not record:
        raise HTTPException(status_code=404, detail="UserCompany record not found")
    return record

@router.put("/{uc_id}", response_model=uc_schema.UserCompany)
def update_user_company(uc_id: int, uc: uc_schema.UserCompanyCreate, db: Session = Depends(get_db)):
    updated = uc_crud.update_user_company(db, uc_id, uc)
    if not updated:
        raise HTTPException(status_code=404, detail="UserCompany record not found")
    return updated

@router.delete("/{uc_id}")
def delete_user_company(uc_id: int, db: Session = Depends(get_db)):
    success = uc_crud.delete_user_company(db, uc_id)
    if not success:
        raise HTTPException(status_code=404, detail="UserCompany record not found")
    return {"detail": "UserCompany record deleted successfully"}
