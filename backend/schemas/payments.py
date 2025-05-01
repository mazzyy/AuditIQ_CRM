from pydantic import BaseModel
from enum import Enum
from datetime import datetime
from typing import Optional

class PaymentStatusEnum(str, Enum):
    pending = "pending"
    success = "success"
    failed = "failed"
    refunded = "refunded"

class PaymentBase(BaseModel):
    user_id: int
    company_id: int
    subscription_id: Optional[int] = None
    payment_provider: str
    provider_payment_id: str
    amount: float
    currency: str
    status: PaymentStatusEnum
    payment_date: datetime
    invoice_url: str
    description: str

class PaymentCreate(PaymentBase):
    pass

class Payment(PaymentBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes  = True
