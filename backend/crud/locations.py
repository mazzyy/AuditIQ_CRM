from sqlalchemy.orm import Session
from models import locations as location_model
from schemas import locations as location_schema

def create_location(db: Session, location: location_schema.LocationCreate):
    db_location = location_model.Location(**location.dict())
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    return db_location

def get_locations(db: Session):
    return db.query(location_model.Location).all()

def get_location(db: Session, location_id: int):
    return db.query(location_model.Location).filter(location_model.Location.id == location_id).first()

def update_location(db: Session, location_id: int, location: location_schema.LocationCreate):
    db_location = get_location(db, location_id)
    if not db_location:
        return None
    db_location.company_id = location.company_id
    db_location.location_name = location.location_name
    db_location.address = location.address
    db_location.tags = location.tags
    db.commit()
    db.refresh(db_location)
    return db_location

def delete_location(db: Session, location_id: int):
    db_location = get_location(db, location_id)
    if not db_location:
        return False
    db.delete(db_location)
    db.commit()
    return True
