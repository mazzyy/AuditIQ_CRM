from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from crud import payments as payment_crud
from schemas import payments as payment_schema
from database import get_db

router = APIRouter(
    prefix="/payments",
    tags=["Payments"],
)

@router.post("/", response_model=payment_schema.Payment)
def create_payment(payment: payment_schema.PaymentCreate, db: Session = Depends(get_db)):
    return payment_crud.create_payment(db, payment)

@router.get("/", response_model=list[payment_schema.Payment])
def get_payments(db: Session = Depends(get_db)):
    return payment_crud.get_payments(db)

@router.get("/{payment_id}", response_model=payment_schema.Payment)
def get_payment(payment_id: int, db: Session = Depends(get_db)):
    record = payment_crud.get_payment(db, payment_id)
    if not record:
        raise HTTPException(status_code=404, detail="Payment not found")
    return record

@router.put("/{payment_id}", response_model=payment_schema.Payment)
def update_payment(payment_id: int, payment: payment_schema.PaymentCreate, db: Session = Depends(get_db)):
    updated = payment_crud.update_payment(db, payment_id, payment)
    if not updated:
        raise HTTPException(status_code=404, detail="Payment not found")
    return updated

@router.delete("/{payment_id}")
def delete_payment(payment_id: int, db: Session = Depends(get_db)):
    success = payment_crud.delete_payment(db, payment_id)
    if not success:
        raise HTTPException(status_code=404, detail="Payment not found")
    return {"detail": "Payment deleted successfully"}
