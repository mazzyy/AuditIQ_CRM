from sqlalchemy.orm import Session
from app import models, schemas

def create_report(db: Session, report: schemas.report.ReportCreate):
    db_report = models.report.Report(**report.dict())
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    return db_report

def get_reports(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.report.Report).offset(skip).limit(limit).all()

def get_report(db: Session, report_id: int):
    return db.query(models.report.Report).filter(models.report.Report.id == report_id).first()

def delete_report(db: Session, report_id: int):
    report = db.query(models.report.Report).filter(models.report.Report.id == report_id).first()
    if report:
        db.delete(report)
        db.commit()
    return report

def update_report(db: Session, report_id: int, report_update: schemas.report.ReportCreate):
    report = db.query(models.report.Report).filter(models.report.Report.id == report_id).first()
    if report:
        for key, value in report_update.dict().items():
            setattr(report, key, value)
        db.commit()
        db.refresh(report)
    return report
