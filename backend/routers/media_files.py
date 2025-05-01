from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from crud import media_files as media_crud
from schemas import media_files as media_schema
from database import get_db

router = APIRouter(
    prefix="/media-files",
    tags=["MediaFiles"],
)

@router.post("/", response_model=media_schema.MediaFile)
def create_media(media: media_schema.MediaFileCreate, db: Session = Depends(get_db)):
    return media_crud.create_media(db, media)

@router.get("/", response_model=list[media_schema.MediaFile])
def get_media_files(db: Session = Depends(get_db)):
    return media_crud.get_media_files(db)

@router.get("/{media_id}", response_model=media_schema.MediaFile)
def get_media(media_id: int, db: Session = Depends(get_db)):
    media = media_crud.get_media(db, media_id)
    if not media:
        raise HTTPException(status_code=404, detail="Media file not found")
    return media

@router.put("/{media_id}", response_model=media_schema.MediaFile)
def update_media(media_id: int, media: media_schema.MediaFileCreate, db: Session = Depends(get_db)):
    updated = media_crud.update_media(db, media_id, media)
    if not updated:
        raise HTTPException(status_code=404, detail="Media file not found")
    return updated

@router.delete("/{media_id}")
def delete_media(media_id: int, db: Session = Depends(get_db)):
    success = media_crud.delete_media(db, media_id)
    if not success:
        raise HTTPException(status_code=404, detail="Media file not found")
    return {"detail": "Media deleted successfully"}
