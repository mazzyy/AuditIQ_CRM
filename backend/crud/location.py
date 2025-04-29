from sqlalchemy.orm import Session
from app import models, schemas

def create_location(db: Session, location: schemas.location.LocationCreate):
    db_location = models.location.Location(**location.dict())
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    return db_location

def get_locations(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.location.Location).offset(skip).limit(limit).all()

def get_location(db: Session, location_id: int):
    return db.query(models.location.Location).filter(models.location.Location.id == location_id).first()

def delete_location(db: Session, location_id: int):
    location = db.query(models.location.Location).filter(models.location.Location.id == location_id).first()
    if location:
        db.delete(location)
        db.commit()
    return location

def update_location(db: Session, location_id: int, location_update: schemas.location.LocationCreate):
    location = db.query(models.location.Location).filter(models.location.Location.id == location_id).first()
    if location:
        for key, value in location_update.dict().items():
            setattr(location, key, value)
        db.commit()
        db.refresh(location)
    return location
