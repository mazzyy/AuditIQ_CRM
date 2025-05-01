from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from crud import user_location as ul_crud
from schemas import user_location as ul_schema
from database import get_db

router = APIRouter(
    prefix="/user-location",
    tags=["UserLocation"],
)

@router.post("/", response_model=ul_schema.UserLocation)
def create_user_location(ul: ul_schema.UserLocationCreate, db: Session = Depends(get_db)):
    return ul_crud.create_user_location(db, ul)

@router.get("/", response_model=list[ul_schema.UserLocation])
def get_all_user_locations(db: Session = Depends(get_db)):
    return ul_crud.get_user_locations(db)

@router.get("/{ul_id}", response_model=ul_schema.UserLocation)
def get_user_location(ul_id: int, db: Session = Depends(get_db)):
    record = ul_crud.get_user_location(db, ul_id)
    if not record:
        raise HTTPException(status_code=404, detail="UserLocation record not found")
    return record

@router.put("/{ul_id}", response_model=ul_schema.UserLocation)
def update_user_location(ul_id: int, ul: ul_schema.UserLocationCreate, db: Session = Depends(get_db)):
    updated = ul_crud.update_user_location(db, ul_id, ul)
    if not updated:
        raise HTTPException(status_code=404, detail="UserLocation record not found")
    return updated

@router.delete("/{ul_id}")
def delete_user_location(ul_id: int, db: Session = Depends(get_db)):
    success = ul_crud.delete_user_location(db, ul_id)
    if not success:
        raise HTTPException(status_code=404, detail="UserLocation record not found")
    return {"detail": "UserLocation record deleted successfully"}
