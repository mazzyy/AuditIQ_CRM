from sqlalchemy.orm import Session
from models import company as company_model
from schemas import company as company_schema

def create_company(db: Session, company: company_schema.CompanyCreate):
    db_company = company_model.Company(**company.dict())
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    return db_company

def get_companies(db: Session, skip: int = 0, limit: int = 100):
    return db.query(company_model.Company).offset(skip).limit(limit).all()

def get_company(db: Session, company_id: int):
    return db.query(company_model.Company).filter(company_model.Company.id == company_id).first()

def delete_company(db: Session, company_id: int):
    company = db.query(company_model.Company).filter(company_model.Company.id == company_id).first()
    if company:
        db.delete(company)
        db.commit()
    return company

def update_company(db: Session, company_id: int, company_update: company_schema.CompanyCreate):
    company = db.query(company_model.Company).filter(company_model.Company.id == company_id).first()
    if company:
        for key, value in company_update.dict().items():
            setattr(company, key, value)
        db.commit()
        db.refresh(company)
    return company
