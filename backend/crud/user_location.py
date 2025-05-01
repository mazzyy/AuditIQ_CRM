from sqlalchemy.orm import Session
from models import user_location as ul_model
from schemas import user_location as ul_schema

def create_user_location(db: Session, ul: ul_schema.UserLocationCreate):
    db_ul = ul_model.UserLocation(**ul.dict())
    db.add(db_ul)
    db.commit()
    db.refresh(db_ul)
    return db_ul

def get_user_locations(db: Session):
    return db.query(ul_model.UserLocation).all()

def get_user_location(db: Session, ul_id: int):
    return db.query(ul_model.UserLocation).filter(ul_model.UserLocation.id == ul_id).first()

def update_user_location(db: Session, ul_id: int, ul: ul_schema.UserLocationCreate):
    db_ul = get_user_location(db, ul_id)
    if not db_ul:
        return None
    db_ul.user_id = ul.user_id
    db_ul.location_id = ul.location_id
    db.commit()
    db.refresh(db_ul)
    return db_ul

def delete_user_location(db: Session, ul_id: int):
    db_ul = get_user_location(db, ul_id)
    if not db_ul:
        return False
    db.delete(db_ul)
    db.commit()
    return True
