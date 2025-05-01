from sqlalchemy.orm import Session
from models import media_files as media_model
from schemas import media_files as media_schema

def create_media(db: Session, media: media_schema.MediaFileCreate):
    db_media = media_model.MediaFile(**media.dict())
    db.add(db_media)
    db.commit()
    db.refresh(db_media)
    return db_media

def get_media_files(db: Session):
    return db.query(media_model.MediaFile).all()

def get_media(db: Session, media_id: int):
    return db.query(media_model.MediaFile).filter(media_model.MediaFile.id == media_id).first()

def update_media(db: Session, media_id: int, media: media_schema.MediaFileCreate):
    db_media = get_media(db, media_id)
    if not db_media:
        return None
    db_media.user_id = media.user_id
    db_media.company_id = media.company_id
    db_media.name = media.name
    db_media.file_url = media.file_url
    db.commit()
    db.refresh(db_media)
    return db_media

def delete_media(db: Session, media_id: int):
    db_media = get_media(db, media_id)
    if not db_media:
        return False
    db.delete(db_media)
    db.commit()
    return True
