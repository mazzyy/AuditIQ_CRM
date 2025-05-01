from sqlalchemy.orm import Session
from models import user_company as uc_model
from schemas import user_company as uc_schema

def create_user_company(db: Session, uc: uc_schema.UserCompanyCreate):
    db_uc = uc_model.UserCompany(**uc.dict())
    db.add(db_uc)
    db.commit()
    db.refresh(db_uc)
    return db_uc

def get_user_companies(db: Session):
    return db.query(uc_model.UserCompany).all()

def get_user_company(db: Session, uc_id: int):
    return db.query(uc_model.UserCompany).filter(uc_model.UserCompany.id == uc_id).first()

def update_user_company(db: Session, uc_id: int, uc: uc_schema.UserCompanyCreate):
    db_uc = get_user_company(db, uc_id)
    if not db_uc:
        return None
    db_uc.user_id = uc.user_id
    db_uc.company_id = uc.company_id
    db.commit()
    db.refresh(db_uc)
    return db_uc

def delete_user_company(db: Session, uc_id: int):
    db_uc = get_user_company(db, uc_id)
    if not db_uc:
        return False
    db.delete(db_uc)
    db.commit()
    return True
