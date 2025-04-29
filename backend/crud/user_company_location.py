from sqlalchemy.orm import Session
from models import user_company_location as models_user_company_location
from schemas import user_company_location as schemas_user_company_location


def create_user_company_location(db: Session, ucl: schemas_user_company_location.UserCompanyLocationCreate):
    db_ucl = models_user_company_location.UserCompanyLocation(**ucl.dict())
    db.add(db_ucl)
    db.commit()
    db.refresh(db_ucl)
    return db_ucl

def get_user_company_locations(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models_user_company_location.UserCompanyLocation).offset(skip).limit(limit).all()

def get_user_company_location(db: Session, ucl_id: int):
    return db.query(models_user_company_location.UserCompanyLocation).filter(models_user_company_location.UserCompanyLocation.id == ucl_id).first()

def delete_user_company_location(db: Session, ucl_id: int):
    ucl = db.query(models_user_company_location.UserCompanyLocation).filter(models_user_company_location.UserCompanyLocation.id == ucl_id).first()
    if ucl:
        db.delete(ucl)
        db.commit()
    return ucl

def update_user_company_location(db: Session, ucl_id: int, ucl_update: schemas_user_company_location.UserCompanyLocationCreate):
    ucl = db.query(models_user_company_location.UserCompanyLocation).filter(models_user_company_location.UserCompanyLocation.id == ucl_id).first()
    if ucl:
        for key, value in ucl_update.dict().items():
            setattr(ucl, key, value)
        db.commit()
        db.refresh(ucl)
    return ucl
