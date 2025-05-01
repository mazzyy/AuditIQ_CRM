from pydantic import BaseModel
from enum import Enum
from datetime import datetime

class SubscriptionStatusEnum(str, Enum):
    trialing = "trialing"
    active = "active"
    past_due = "past_due"
    paused = "paused"
    canceled = "canceled"
    expired = "expired"

class SubscriptionBase(BaseModel):
    user_id: int
    company_id: int
    plan_name: str
    payment_provider: str
    provider_subscription_id: str
    status: SubscriptionStatusEnum
    trial_end: datetime
    current_period_start: datetime
    current_period_end: datetime
    cancel_at_period_end: bool

class SubscriptionCreate(SubscriptionBase):
    pass

class Subscription(SubscriptionBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes  = True
