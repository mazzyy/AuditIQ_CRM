from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from crud import user_company_location as crud_user_company_location
from schemas import user_company_location as schemas_user_company_location

router = APIRouter(
    prefix="/user-company-location",
    tags=["UserCompanyLocation"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas_user_company_location.UserCompanyLocation)
def create_user_company_location(ucl: schemas_user_company_location.UserCompanyLocationCreate, db: Session = Depends(get_db)):
    return crud_user_company_location.create_ucl(db=db, ucl=ucl)

@router.get("/", response_model=list[schemas_user_company_location.UserCompanyLocation])
def read_user_company_locations(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_user_company_location.get_ucls(db=db, skip=skip, limit=limit)

@router.get("/{ucl_id}", response_model=schemas_user_company_location.UserCompanyLocation)
def read_user_company_location(ucl_id: int, db: Session = Depends(get_db)):
    db_ucl = crud_user_company_location.get_ucl(db=db, ucl_id=ucl_id)
    if db_ucl is None:
        raise HTTPException(status_code=404, detail="User-Company-Location not found")
    return db_ucl
