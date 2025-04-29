from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import crud, schemas
from backend.database import SessionLocal

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

@router.post("/", response_model=schemas.location.Location)
def create_location(location: schemas.location.LocationCreate, db: Session = Depends(get_db)):
    return crud.location.create_location(db=db, location=location)

@router.get("/", response_model=list[schemas.location.Location])
def read_locations(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.location.get_locations(db=db, skip=skip, limit=limit)

@router.get("/{location_id}", response_model=schemas.location.Location)
def read_location(location_id: int, db: Session = Depends(get_db)):
    db_location = crud.location.get_location(db=db, location_id=location_id)
    if db_location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    return db_location
