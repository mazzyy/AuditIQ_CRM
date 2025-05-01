from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from crud import subscriptions as sub_crud
from schemas import subscriptions as sub_schema
from database import get_db

router = APIRouter(
    prefix="/subscriptions",
    tags=["Subscriptions"],
)

@router.post("/", response_model=sub_schema.Subscription)
def create_subscription(sub: sub_schema.SubscriptionCreate, db: Session = Depends(get_db)):
    return sub_crud.create_subscription(db, sub)

@router.get("/", response_model=list[sub_schema.Subscription])
def get_subscriptions(db: Session = Depends(get_db)):
    return sub_crud.get_subscriptions(db)

@router.get("/{sub_id}", response_model=sub_schema.Subscription)
def get_subscription(sub_id: int, db: Session = Depends(get_db)):
    record = sub_crud.get_subscription(db, sub_id)
    if not record:
        raise HTTPException(status_code=404, detail="Subscription not found")
    return record

@router.put("/{sub_id}", response_model=sub_schema.Subscription)
def update_subscription(sub_id: int, sub: sub_schema.SubscriptionCreate, db: Session = Depends(get_db)):
    updated = sub_crud.update_subscription(db, sub_id, sub)
    if not updated:
        raise HTTPException(status_code=404, detail="Subscription not found")
    return updated

@router.delete("/{sub_id}")
def delete_subscription(sub_id: int, db: Session = Depends(get_db)):
    success = sub_crud.delete_subscription(db, sub_id)
    if not success:
        raise HTTPException(status_code=404, detail="Subscription not found")
    return {"detail": "Subscription deleted successfully"}
