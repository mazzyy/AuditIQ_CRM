# from fastapi import FastAPI
# from backend.database import Base, engine
# from backend.routers import report, user, company, location, user_company_location

# # Create database tables
# Base.metadata.create_all(bind=engine)

# app = FastAPI()

# # Include all routers
# app.include_router(user.router)
# app.include_router(company.router)
# app.include_router(location.router)
# app.include_router(report.router)
# app.include_router(user_company_location.router)
# backend/main.py

# backend/main.py

from fastapi import FastAPI
from database import Base, engine
from routers import (
    users,
    company_store,
    locations,
    reports,
    report_templates,
    media_files,
    user_company,
    user_location,
    payments,
    subscriptions
)

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def root():
    return {
  "status": "ok",
  "version": "1.0.0",
  "service": "AuditIQ API"
}

# ✅ Include all routers
app.include_router(users.router)
app.include_router(company_store.router)
app.include_router(locations.router)
app.include_router(reports.router)
app.include_router(report_templates.router)
app.include_router(media_files.router)
app.include_router(user_company.router)
app.include_router(user_location.router)
app.include_router(payments.router)
app.include_router(subscriptions.router)


# ⬇️ ADD these 3 imports to load all tables properly
# from models import company, user, location, report as report_model, user_company_location


# ⬇️ ADD these 3 imports to load all tables properly
# from models import company, user, location, report as report_model, user_company_location
