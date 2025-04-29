from fastapi import FastAPI
from app.database import Base, engine
from app.routers import user, company, location, report, user_company_location

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user.router)
app.include_router(company.router)
app.include_router(location.router)
app.include_router(report.router)
app.include_router(user_company_location.router)
