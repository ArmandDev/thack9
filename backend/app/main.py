from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import logging
import os

# Import routers and database components
# These will be implemented in separate files
# from .routers import users, expenses, sick_leave, education, assets, maintenance, travel
from .database import engine, Base, get_db
# from .auth import oauth2_scheme, get_current_user

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# Create tables in the database
# Commented out as we'll use init_db.py for initial setup
# Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="Internal Management Platform",
    description="A comprehensive platform for HR, Expense, Asset, Maintenance, Education/Social, and Travel Management",
    version="0.1.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Setup endpoint - creates admin user if no users exist
@app.get("/setup")
def setup():
    # This would check if users exist and prompt for admin creation
    # For now, just return a message
    return {"message": "Setup endpoint. Will be implemented to create admin user on first run."}

# Include routers
# app.include_router(users.router, prefix="/api/users", tags=["users"])
# app.include_router(expenses.router, prefix="/api/expenses", tags=["expenses"])
# app.include_router(sick_leave.router, prefix="/api/sick-leave", tags=["sick-leave"])
# app.include_router(education.router, prefix="/api/education", tags=["education"])
# app.include_router(assets.router, prefix="/api/assets", tags=["assets"])
# app.include_router(maintenance.router, prefix="/api/maintenance", tags=["maintenance"])
# app.include_router(travel.router, prefix="/api/travel", tags=["travel"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)