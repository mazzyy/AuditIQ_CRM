from sqlalchemy.orm import Session
from models import company_store as company_model
from schemas import company_store as company_schema

def create_company(db: Session, company: company_schema.CompanyStoreCreate):
    db_company = company_model.CompanyStore(**company.dict())
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    return db_company

def get_companies(db: Session):
    return db.query(company_model.CompanyStore).all()

def get_company(db: Session, company_id: int):
    return db.query(company_model.CompanyStore).filter(company_model.CompanyStore.id == company_id).first()

def update_company(db: Session, company_id: int, company: company_schema.CompanyStoreCreate):
    db_company = get_company(db, company_id)
    if not db_company:
        return None
    db_company.name = company.name
    db.commit()
    db.refresh(db_company)
    return db_company

def delete_company(db: Session, company_id: int):
    db_company = get_company(db, company_id)
    if not db_company:
        return False
    db.delete(db_company)
    db.commit()
    return True
