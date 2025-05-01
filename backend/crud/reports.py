from sqlalchemy.orm import Session
from models import reports as report_model
from schemas import reports as report_schema

def create_report(db: Session, report: report_schema.ReportCreate):
    db_report = report_model.Report(**report.dict())
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    return db_report

def get_reports(db: Session):
    return db.query(report_model.Report).all()

def get_report(db: Session, report_id: int):
    return db.query(report_model.Report).filter(report_model.Report.id == report_id).first()

def update_report(db: Session, report_id: int, report: report_schema.ReportCreate):
    db_report = get_report(db, report_id)
    if not db_report:
        return None
    for field, value in report.dict().items():
        setattr(db_report, field, value)
    db.commit()
    db.refresh(db_report)
    return db_report

def delete_report(db: Session, report_id: int):
    db_report = get_report(db, report_id)
    if not db_report:
        return False
    db.delete(db_report)
    db.commit()
    return True
