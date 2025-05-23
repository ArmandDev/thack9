from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
import enum

# Enums
class UserRole(str, enum.Enum):
    ADMIN = "admin"
    MANAGER = "manager"
    EMPLOYEE = "employee"

class RequestStatus(str, enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    CANCELLED = "cancelled"

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str
    first_name: str
    last_name: str
    role: UserRole = UserRole.EMPLOYEE

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    role: Optional[UserRole] = None
    is_active: Optional[bool] = None

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

# Expense schemas
class ExpenseBase(BaseModel):
    amount: float
    category: str
    description: str

class ExpenseCreate(ExpenseBase):
    receipt_url: Optional[str] = None

class ExpenseUpdate(BaseModel):
    amount: Optional[float] = None
    category: Optional[str] = None
    description: Optional[str] = None
    status: Optional[RequestStatus] = None
    receipt_url: Optional[str] = None

class Expense(ExpenseBase):
    id: int
    user_id: int
    status: RequestStatus
    receipt_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

# Sick Leave schemas
class SickLeaveBase(BaseModel):
    start_date: datetime
    end_date: datetime
    reason: str

class SickLeaveCreate(SickLeaveBase):
    document_url: Optional[str] = None

class SickLeaveUpdate(BaseModel):
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    reason: Optional[str] = None
    status: Optional[RequestStatus] = None
    document_url: Optional[str] = None

class SickLeave(SickLeaveBase):
    id: int
    user_id: int
    status: RequestStatus
    document_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

# Education Activity schemas
class EducationActivityBase(BaseModel):
    title: str
    description: str
    start_date: datetime
    end_date: datetime
    location: str
    capacity: Optional[int] = None

class EducationActivityCreate(EducationActivityBase):
    pass

class EducationActivityUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    location: Optional[str] = None
    capacity: Optional[int] = None

class EducationActivity(EducationActivityBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

# Activity Registration schemas
class ActivityRegistrationBase(BaseModel):
    activity_id: int
    user_id: int

class ActivityRegistrationCreate(ActivityRegistrationBase):
    pass

class ActivityRegistration(ActivityRegistrationBase):
    id: int
    status: RequestStatus
    created_at: datetime

    class Config:
        orm_mode = True

# Asset schemas
class AssetBase(BaseModel):
    name: str
    description: str
    category: str
    location: str

class AssetCreate(AssetBase):
    pass

class AssetUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    location: Optional[str] = None
    is_available: Optional[bool] = None

class Asset(AssetBase):
    id: int
    is_available: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

# Asset Booking schemas
class AssetBookingBase(BaseModel):
    asset_id: int
    start_time: datetime
    end_time: datetime
    purpose: str

class AssetBookingCreate(AssetBookingBase):
    pass

class AssetBookingUpdate(BaseModel):
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    purpose: Optional[str] = None
    status: Optional[RequestStatus] = None

class AssetBooking(AssetBookingBase):
    id: int
    user_id: int
    status: RequestStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

# Maintenance Issue schemas
class MaintenanceIssueBase(BaseModel):
    title: str
    description: str
    location: str
    priority: str

class MaintenanceIssueCreate(MaintenanceIssueBase):
    image_url: Optional[str] = None

class MaintenanceIssueUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    image_url: Optional[str] = None

class MaintenanceIssue(MaintenanceIssueBase):
    id: int
    reporter_id: int
    status: str
    image_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

# Travel Request schemas
class TravelRequestBase(BaseModel):
    destination: str
    purpose: str
    departure_date: datetime
    return_date: datetime
    estimated_cost: float

class TravelRequestCreate(TravelRequestBase):
    pass

class TravelRequestUpdate(BaseModel):
    destination: Optional[str] = None
    purpose: Optional[str] = None
    departure_date: Optional[datetime] = None
    return_date: Optional[datetime] = None
    estimated_cost: Optional[float] = None
    status: Optional[RequestStatus] = None

class TravelRequest(TravelRequestBase):
    id: int
    user_id: int
    status: RequestStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

# Travel Booking schemas
class TravelBookingBase(BaseModel):
    travel_request_id: int
    booking_type: str
    provider: str
    booking_reference: str
    details: str
    cost: float

class TravelBookingCreate(TravelBookingBase):
    pass

class TravelBookingUpdate(BaseModel):
    booking_type: Optional[str] = None
    provider: Optional[str] = None
    booking_reference: Optional[str] = None
    details: Optional[str] = None
    cost: Optional[float] = None

class TravelBooking(TravelBookingBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True