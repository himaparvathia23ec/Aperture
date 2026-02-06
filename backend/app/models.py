from pydantic import BaseModel, Field
from typing import List, Optional, Literal
from datetime import datetime

# --- Raw Data Models ---

class DisasterData1(BaseModel):
    id: str
    type: str
    source: str
    reported_at: datetime
    valid_till: datetime
    locations: List[str]
    urgency: int
    severity_level: str
    confidence: str
    summary: str

class DisasterData2(BaseModel):
    id: str
    type: str
    source: str
    reported_at: datetime
    valid_till: datetime
    regions_covered: List[str]
    primary_focus_area: str
    urgency: int
    severity_level: str
    confidence: str
    summary: str

class HospitalResourceItem(BaseModel):
    category: str
    DME: int
    DM_RHS: int
    DPH: int
    DIR_ESI: int
    grand_total: int

class HospitalResourceData(BaseModel):
    resources: List[HospitalResourceItem]

# --- Auth Models ---

class User(BaseModel):
    username: str
    password: str
    role: str
    full_name: str

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    username: str
    role: str
    full_name: str
    token: str # Simple session token (just username for prototype)

class ManualCrisisReport(BaseModel):
    title: str
    location: str
    type: str # flood, earthquake, fire, medical, landslide, other
    severity: int = Field(..., ge=1, le=5)
    description: str
    notes: Optional[str] = None

class ConfirmationRequest(BaseModel):
    crisis_id: str
    resource_id: str
    action: str # "approve", "reject"
    comment: Optional[str] = None

# --- Normalized Models ---

class NormalizedCrisis(BaseModel):
    id: str
    title: str
    source: str
    timestamp: datetime
    locations: List[str]
    urgency_score: int  # Normalized 1-5
    severity: str
    confidence: Literal["high", "medium", "low"]
    summary: str
    raw_data_type: str

class NormalizedResource(BaseModel):
    id: str
    name: str  # Generic name or category
    capacity: int
    details: dict

class ResourceRecommendation(BaseModel):
    resource_id: str
    resource_name: str
    score: float
    confidence: Literal["high", "medium", "low"]
    reasoning: List[str]
    details: dict
