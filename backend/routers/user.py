from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from crud import user as user_crud
from schemas import user as user_schema
from database import SessionLocal

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/create-user", response_model=user_schema.User)
def create_user(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    print("create user")
    return user_crud.create_user(db=db, user=user)

@router.get("/users", response_model=list[user_schema.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return user_crud.get_users(db=db, skip=skip, limit=limit)

@router.get("/{user_id}", response_model=user_schema.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = user_crud.get_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
