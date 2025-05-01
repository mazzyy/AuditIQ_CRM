from sqlalchemy.orm import Session
from models import users as user_model
from schemas import users as user_schema
from datetime import datetime
from passlib.hash import bcrypt

def create_user(db: Session, user: user_schema.UserCreate):
    # Check if email exists
    existing_user = db.query(user_model.User).filter(user_model.User.email == user.email).first()
    if existing_user:
        raise ValueError("Email already registered.")
    
    hashed_password = bcrypt.hash(user.password)
    db_user = user_model.User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        password_hash=hashed_password,
        phone_number=user.phone_number,
        theme=user.theme,
        role=user.role,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session):
    return db.query(user_model.User).all()

def get_user(db: Session, user_id: int):
    return db.query(user_model.User).filter(user_model.User.id == user_id).first()

def update_user(db: Session, user_id: int, user: user_schema.UserCreate):
    db_user = get_user(db, user_id)
    if not db_user:
        return None
    db_user.first_name = user.first_name
    db_user.last_name = user.last_name
    db_user.email = user.email
    db_user.password_hash = bcrypt.hash(user.password)
    db_user.phone_number = user.phone_number
    db_user.theme = user.theme
    db_user.role = user.role
    db_user.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    db_user = get_user(db, user_id)
    if not db_user:
        return False
    db.delete(db_user)
    db.commit()
    return True
