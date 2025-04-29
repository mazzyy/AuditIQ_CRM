from sqlalchemy.orm import Session
from schemas import user as user_schema
from models import user as user_model



def create_user(db: Session, user: user_schema.UserCreate):
    db_user = user_model.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(user_model.User).offset(skip).limit(limit).all()

def get_user(db: Session, user_id: int):
    return db.query(user_model.User).filter(user_model.User.id == user_id).first()

def delete_user(db: Session, user_id: int):
    user = db.query(user_model.User).filter(user_model.User.id == user_id).first()
    if user:
        db.delete(user)
        db.commit()
    return user

def update_user(db: Session, user_id: int, user_update: user_schema.UserCreate):
    user = db.query(user_model.User).filter(user_model.User.id == user_id).first()
    if user:
        for key, value in user_update.dict().items():
            setattr(user, key, value)
        db.commit()
        db.refresh(user)
    return user
