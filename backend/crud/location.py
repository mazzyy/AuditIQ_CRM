from sqlalchemy.orm import Session
from models import location as models_location
from schemas import location as schemas_location

def create_location(db: Session, location: schemas_location.LocationCreate):
    db_location = models_location.Location(**location.dict())
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    return db_location

def get_locations(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models_location.Location).offset(skip).limit(limit).all()

def get_location(db: Session, location_id: int):
    return db.query(models_location.Location).filter(models_location.Location.id == location_id).first()

def delete_location(db: Session, location_id: int):
    location = db.query(models_location.Location).filter(models_location.Location.id == location_id).first()
    if location:
        db.delete(location)
        db.commit()
    return location

def update_location(db: Session, location_id: int, location_update: schemas_location.LocationCreate):
    location = db.query(models_location.Location).filter(models_location.Location.id == location_id).first()
    if location:
        for key, value in location_update.dict().items():
            setattr(location, key, value)
        db.commit()
        db.refresh(location)
    return location
