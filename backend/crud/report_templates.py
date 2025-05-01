from sqlalchemy.orm import Session
from models import report_templates as template_model
from schemas import report_templates as template_schema
from datetime import datetime

def create_template(db: Session, template: template_schema.ReportTemplateCreate):
    db_template = template_model.ReportTemplate(
        name=template.name,
        description=template.description,
        content=template.content,
    )
    db.add(db_template)
    db.commit()
    db.refresh(db_template)
    return db_template

def get_templates(db: Session):
    return db.query(template_model.ReportTemplate).all()

def get_template(db: Session, template_id: int):
    return db.query(template_model.ReportTemplate).filter(template_model.ReportTemplate.id == template_id).first()

def update_template(db: Session, template_id: int, template: template_schema.ReportTemplateCreate):
    db_template = get_template(db, template_id)
    if not db_template:
        return None
    db_template.name = template.name
    db_template.description = template.description
    db_template.content = template.content
    db_template.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_template)
    return db_template

def delete_template(db: Session, template_id: int):
    db_template = get_template(db, template_id)
    if not db_template:
        return False
    db.delete(db_template)
    db.commit()
    return True
