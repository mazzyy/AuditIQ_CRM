from fastapi import FastAPI
from backend.database import Base, engine
from backend.routers import report, user, company, location, user_company_location

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Include all routers
app.include_router(user.router)
app.include_router(company.router)
app.include_router(location.router)
app.include_router(report.router)
app.include_router(user_company_location.router)
