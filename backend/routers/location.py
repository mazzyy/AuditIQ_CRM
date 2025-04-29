from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from crud import location as crud_location
from schemas import location as schemas_location

router = APIRouter(
    prefix="/locations",
    tags=["Locations"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas_location.Location)
def create_location(location: schemas_location.LocationCreate, db: Session = Depends(get_db)):
    return crud_location.create_location(db=db, location=location)

@router.get("/", response_model=list[schemas_location.Location])
def read_locations(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_location.get_locations(db=db, skip=skip, limit=limit)

@router.get("/{location_id}", response_model=schemas_location.Location)
def read_location(location_id: int, db: Session = Depends(get_db)):
    db_location = crud_location.get_location(db=db, location_id=location_id)
    if db_location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    return db_location
