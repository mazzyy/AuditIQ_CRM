from sqlalchemy.orm import Session
from backend import models, schemas

def create_company(db: Session, company: schemas.company.CompanyCreate):
    db_company = models.company.Company(**company.dict())
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    return db_company

def get_companies(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.company.Company).offset(skip).limit(limit).all()

def get_company(db: Session, company_id: int):
    return db.query(models.company.Company).filter(models.company.Company.id == company_id).first()

def delete_company(db: Session, company_id: int):
    company = db.query(models.company.Company).filter(models.company.Company.id == company_id).first()
    if company:
        db.delete(company)
        db.commit()
    return company

def update_company(db: Session, company_id: int, company_update: schemas.company.CompanyCreate):
    company = db.query(models.company.Company).filter(models.company.Company.id == company_id).first()
    if company:
        for key, value in company_update.dict().items():
            setattr(company, key, value)
        db.commit()
        db.refresh(company)
    return company
