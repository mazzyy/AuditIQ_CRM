from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import crud, schemas
from backend.database import SessionLocal

router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create a Report
@router.post("/", response_model=schemas.report.Report)
def create_report(report: schemas.report.ReportCreate, db: Session = Depends(get_db)):
    return crud.report.create_report(db=db, report=report)

# Read all Reports
@router.get("/", response_model=list[schemas.report.Report])
def read_reports(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.report.get_reports(db=db, skip=skip, limit=limit)

# Read a single Report by ID
@router.get("/{report_id}", response_model=schemas.report.Report)
def read_report(report_id: int, db: Session = Depends(get_db)):
    db_report = crud.report.get_report(db=db, report_id=report_id)
    if db_report is None:
        raise HTTPException(status_code=404, detail="Report not found")
    return db_report
