from sqlalchemy.orm import Session
from models import subscriptions as sub_model
from schemas import subscriptions as sub_schema
from datetime import datetime

def create_subscription(db: Session, sub: sub_schema.SubscriptionCreate):
    db_sub = sub_model.Subscription(**sub.dict())
    db.add(db_sub)
    db.commit()
    db.refresh(db_sub)
    return db_sub

def get_subscriptions(db: Session):
    return db.query(sub_model.Subscription).all()

def get_subscription(db: Session, sub_id: int):
    return db.query(sub_model.Subscription).filter(sub_model.Subscription.id == sub_id).first()

def update_subscription(db: Session, sub_id: int, sub: sub_schema.SubscriptionCreate):
    db_sub = get_subscription(db, sub_id)
    if not db_sub:
        return None
    for field, value in sub.dict().items():
        setattr(db_sub, field, value)
    db_sub.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_sub)
    return db_sub

def delete_subscription(db: Session, sub_id: int):
    db_sub = get_subscription(db, sub_id)
    if not db_sub:
        return False
    db.delete(db_sub)
    db.commit()
    return True
