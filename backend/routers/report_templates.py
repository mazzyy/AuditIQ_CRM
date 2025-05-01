from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from crud import report_templates as template_crud
from schemas import report_templates as template_schema
from database import get_db

router = APIRouter(
    prefix="/report-templates",
    tags=["ReportTemplates"],
)

@router.post("/", response_model=template_schema.ReportTemplate)
def create_template(template: template_schema.ReportTemplateCreate, db: Session = Depends(get_db)):
    return template_crud.create_template(db, template)

@router.get("/", response_model=list[template_schema.ReportTemplate])
def get_templates(db: Session = Depends(get_db)):
    return template_crud.get_templates(db)

@router.get("/{template_id}", response_model=template_schema.ReportTemplate)
def get_template(template_id: int, db: Session = Depends(get_db)):
    template = template_crud.get_template(db, template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    return template

@router.put("/{template_id}", response_model=template_schema.ReportTemplate)
def update_template(template_id: int, template: template_schema.ReportTemplateCreate, db: Session = Depends(get_db)):
    updated = template_crud.update_template(db, template_id, template)
    if not updated:
        raise HTTPException(status_code=404, detail="Template not found")
    return updated

@router.delete("/{template_id}")
def delete_template(template_id: int, db: Session = Depends(get_db)):
    success = template_crud.delete_template(db, template_id)
    if not success:
        raise HTTPException(status_code=404, detail="Template not found")
    return {"detail": "Template deleted successfully"}
