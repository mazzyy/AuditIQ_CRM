# backend/crud/report.py

from sqlalchemy.orm import Session
from models import report as report_model
from schemas import report as report_schema

def create_report(db: Session, report: report_schema.ReportCreate):
    db_report = report_model.Report(**report.dict())
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    return db_report

def get_reports(db: Session, skip: int = 0, limit: int = 100):
    return db.query(report_model.Report).offset(skip).limit(limit).all()

def get_report(db: Session, report_id: int):
    return db.query(report_model.Report).filter(report_model.Report.id == report_id).first()

def delete_report(db: Session, report_id: int):
    report = db.query(report_model.Report).filter(report_model.Report.id == report_id).first()
    if report:
        db.delete(report)
        db.commit()
    return report

def update_report(db: Session, report_id: int, report_update: report_schema.ReportCreate):
    report = db.query(report_model.Report).filter(report_model.Report.id == report_id).first()
    if report:
        for key, value in report_update.dict().items():
            setattr(report, key, value)
        db.commit()
        db.refresh(report)
    return report
