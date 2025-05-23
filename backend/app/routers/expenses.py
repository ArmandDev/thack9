from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile
from sqlalchemy.orm import Session
from typing import List, Optional
import logging

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter()
logger = logging.getLogger(__name__)

# Create a new expense
@router.post("/", response_model=schemas.Expense, status_code=status.HTTP_201_CREATED)
async def create_expense(
    expense: schemas.ExpenseCreate,
    db: Session = Depends(get_db),
    current_user = Depends(auth.get_current_user)
):
    # Create new expense
    db_expense = models.Expense(
        user_id=current_user.id,  # In a real app, this would be the current user's ID
        amount=expense.amount,
        category=expense.category,
        description=expense.description,
        receipt_url=expense.receipt_url
    )
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

# Upload receipt
@router.post("/upload-receipt")
async def upload_receipt(file: UploadFile = File(...)):
    # In a real app, this would upload to Azure Blob Storage
    # For now, just return a dummy URL
    return {"receipt_url": f"https://storage.example.com/receipts/{file.filename}"}

# Get all expenses (for admin)
@router.get("/", response_model=List[schemas.Expense])
async def read_expenses(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user = Depends(auth.get_current_admin)
):
    query = db.query(models.Expense)
    if status:
        query = query.filter(models.Expense.status == status)
    expenses = query.offset(skip).limit(limit).all()
    return expenses

# Get expenses for current user
@router.get("/me", response_model=List[schemas.Expense])
async def read_my_expenses(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user = Depends(auth.get_current_user)
):
    query = db.query(models.Expense).filter(models.Expense.user_id == current_user.id)
    if status:
        query = query.filter(models.Expense.status == status)
    expenses = query.offset(skip).limit(limit).all()
    return expenses

# Get expense by ID
@router.get("/{expense_id}", response_model=schemas.Expense)
async def read_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(auth.get_current_user)
):
    db_expense = db.query(models.Expense).filter(models.Expense.id == expense_id).first()
    if db_expense is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found"
        )
    
    # Check if user has permission to view this expense
    if current_user.role != "admin" and db_expense.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    return db_expense

# Update expense
@router.put("/{expense_id}", response_model=schemas.Expense)
async def update_expense(
    expense_id: int,
    expense: schemas.ExpenseUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(auth.get_current_user)
):
    db_expense = db.query(models.Expense).filter(models.Expense.id == expense_id).first()
    if db_expense is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found"
        )
    
    # Check if user has permission to update this expense
    if current_user.role != "admin" and db_expense.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    # Only admins can change status
    expense_data = expense.dict(exclude_unset=True)
    if current_user.role != "admin" and "status" in expense_data:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to change status"
        )
    
    for key, value in expense_data.items():
        setattr(db_expense, key, value)
    
    db.commit()
    db.refresh(db_expense)
    return db_expense

# Delete expense
@router.delete("/{expense_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(auth.get_current_user)
):
    db_expense = db.query(models.Expense).filter(models.Expense.id == expense_id).first()
    if db_expense is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found"
        )
    
    # Check if user has permission to delete this expense
    if current_user.role != "admin" and db_expense.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    db.delete(db_expense)
    db.commit()
    return None