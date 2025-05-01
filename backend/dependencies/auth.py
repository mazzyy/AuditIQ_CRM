from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from crud import users as user_crud
from database import get_db
from schemas import users as user_schema

def get_current_user(db: Session = Depends(get_db)) -> user_schema.User:
    #  This is hardcoded for testing, you can replace it with token logic later.
    current_user = user_crud.get_user(db, 1)  # assume user ID 1 is logged in
    if not current_user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return current_user
