from sqlalchemy.orm import Session
from app import models, schemas

def create_user(db: Session, user: schemas.user.UserCreate):
    db_user = models.user.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.user.User).offset(skip).limit(limit).all()

def get_user(db: Session, user_id: int):
    return db.query(models.user.User).filter(models.user.User.id == user_id).first()

def delete_user(db: Session, user_id: int):
    user = db.query(models.user.User).filter(models.user.User.id == user_id).first()
    if user:
        db.delete(user)
        db.commit()
    return user

def update_user(db: Session, user_id: int, user_update: schemas.user.UserCreate):
    user = db.query(models.user.User).filter(models.user.User.id == user_id).first()
    if user:
        for key, value in user_update.dict().items():
            setattr(user, key, value)
        db.commit()
        db.refresh(user)
    return user
