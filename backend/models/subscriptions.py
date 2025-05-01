from sqlalchemy import Column, Integer, String, ForeignKey, Enum, DateTime, Boolean
from database import Base
from datetime import datetime
import enum

class SubscriptionStatusEnum(str, enum.Enum):
    trialing = "trialing"
    active = "active"
    past_due = "past_due"
    paused = "paused"
    canceled = "canceled"
    expired = "expired"

class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    company_id = Column(Integer, ForeignKey("company_store.id"))
    plan_name = Column(String(100))
    payment_provider = Column(String(100))
    provider_subscription_id = Column(String(255))
    status = Column(Enum(SubscriptionStatusEnum))
    trial_end = Column(DateTime)
    current_period_start = Column(DateTime)
    current_period_end = Column(DateTime)
    cancel_at_period_end = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
