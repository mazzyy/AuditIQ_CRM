from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from crud import locations as location_crud
from schemas import locations as location_schema
from database import get_db

router = APIRouter(
    prefix="/locations",
    tags=["Locations"],
)

@router.post("/", response_model=location_schema.Location)
def create_location(location: location_schema.LocationCreate, db: Session = Depends(get_db)):
    return location_crud.create_location(db, location)

@router.get("/", response_model=list[location_schema.Location])
def get_locations(db: Session = Depends(get_db)):
    return location_crud.get_locations(db)

@router.get("/{location_id}", response_model=location_schema.Location)
def get_location(location_id: int, db: Session = Depends(get_db)):
    location = location_crud.get_location(db, location_id)
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    return location

@router.put("/{location_id}", response_model=location_schema.Location)
def update_location(location_id: int, location: location_schema.LocationCreate, db: Session = Depends(get_db)):
    updated = location_crud.update_location(db, location_id, location)
    if not updated:
        raise HTTPException(status_code=404, detail="Location not found")
    return updated

@router.delete("/{location_id}")
def delete_location(location_id: int, db: Session = Depends(get_db)):
    success = location_crud.delete_location(db, location_id)
    if not success:
        raise HTTPException(status_code=404, detail="Location not found")
    return {"detail": "Location deleted successfully"}
