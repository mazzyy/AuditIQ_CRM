from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from crud import reports as report_crud
from schemas import reports as report_schema
from database import get_db

router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)

@router.post("/", response_model=report_schema.Report)
def create_report(report: report_schema.ReportCreate, db: Session = Depends(get_db)):
    return report_crud.create_report(db, report)

@router.get("/", response_model=list[report_schema.Report])
def get_reports(db: Session = Depends(get_db)):
    return report_crud.get_reports(db)

@router.get("/{report_id}", response_model=report_schema.Report)
def get_report(report_id: int, db: Session = Depends(get_db)):
    report = report_crud.get_report(db, report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report

@router.put("/{report_id}", response_model=report_schema.Report)
def update_report(report_id: int, report: report_schema.ReportCreate, db: Session = Depends(get_db)):
    updated = report_crud.update_report(db, report_id, report)
    if not updated:
        raise HTTPException(status_code=404, detail="Report not found")
    return updated

@router.delete("/{report_id}")
def delete_report(report_id: int, db: Session = Depends(get_db)):
    success = report_crud.delete_report(db, report_id)
    if not success:
        raise HTTPException(status_code=404, detail="Report not found")
    return {"detail": "Report deleted successfully"}
