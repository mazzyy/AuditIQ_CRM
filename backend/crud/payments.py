from sqlalchemy.orm import Session
from models import payments as payment_model
from schemas import payments as payment_schema
from datetime import datetime

def create_payment(db: Session, payment: payment_schema.PaymentCreate):
    db_payment = payment_model.Payment(**payment.dict())
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment

def get_payments(db: Session):
    return db.query(payment_model.Payment).all()

def get_payment(db: Session, payment_id: int):
    return db.query(payment_model.Payment).filter(payment_model.Payment.id == payment_id).first()

def update_payment(db: Session, payment_id: int, payment: payment_schema.PaymentCreate):
    db_payment = get_payment(db, payment_id)
    if not db_payment:
        return None
    for field, value in payment.dict().items():
        setattr(db_payment, field, value)
    db_payment.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_payment)
    return db_payment

def delete_payment(db: Session, payment_id: int):
    db_payment = get_payment(db, payment_id)
    if not db_payment:
        return False
    db.delete(db_payment)
    db.commit()
    return True
