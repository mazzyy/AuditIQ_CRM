from sqlalchemy import Column, Integer, String, ForeignKey, DECIMAL, Enum, DateTime, Text
from database import Base
from datetime import datetime
import enum

class PaymentStatusEnum(str, enum.Enum):
    pending = "pending"
    success = "success"
    failed = "failed"
    refunded = "refunded"

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    company_id = Column(Integer, ForeignKey("company_store.id"))
    subscription_id = Column(Integer, ForeignKey("subscriptions.id"), nullable=True)
    payment_provider = Column(String(100))
    provider_payment_id = Column(String(255))
    amount = Column(DECIMAL(10, 2))
    currency = Column(String(10))
    status = Column(Enum(PaymentStatusEnum))
    payment_date = Column(DateTime)
    invoice_url = Column(String(255))
    description = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

