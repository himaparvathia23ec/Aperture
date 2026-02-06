from fastapi import FastAPI, HTTPException, Body
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.models import NormalizedCrisis, NormalizedResource, ResourceRecommendation, LoginRequest, LoginResponse, ManualCrisisReport, ConfirmationRequest
from app.services import ingestion, scoring

app = FastAPI(
    title="Emergency Response Decision-Support System",
    description="Backend for coordinating emergency response allocation with human-in-the-loop decision making.",
    version="0.1.0"
)

# CORS Setup for Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Endpoints ---

@app.post("/api/login", response_model=LoginResponse)
def login(request: LoginRequest = Body(...)):
    """
    Authenticate user against the JSON user store.
    """
    users = ingestion.load_users()
    user = next((u for u in users if u.username == request.username and u.password == request.password), None)
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
        
    return LoginResponse(
        username=user.username,
        role=user.role,
        full_name=user.full_name,
        token=user.username # Simple dummy token
    )

@app.get("/api/crisis", response_model=List[NormalizedCrisis])
def get_crisis_dashboard():
    """
    Get all active disaster bulletins, normalized from various sources.
    """
    try:
        return ingestion.load_disaster_data()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/resources", response_model=List[NormalizedResource])
def get_resources():
    """
    Get available hospital resources.
    """
    try:
        return ingestion.load_hospital_resources()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/recommendations/{crisis_id}", response_model=List[ResourceRecommendation])
def get_recommendations(crisis_id: str):
    """
    Get ranked resource suggestions for a specific crisis.
    """
    crises = ingestion.load_disaster_data()
    target_crisis = next((c for c in crises if c.id == crisis_id), None)
    
    if not target_crisis:
        raise HTTPException(status_code=404, detail="Crisis not found")
        
    resources = ingestion.load_hospital_resources()
    
    recommendations = scoring.generate_recommendations(target_crisis, resources)
    return recommendations


@app.post("/api/confirm")
def confirm_action(request: ConfirmationRequest = Body(...)):
    """
    Human-in-the-loop confirmation endpoint.
    """
    print(f"HUMAN DECISION LOG: Action={request.action} Crisis={request.crisis_id} Resource={request.resource_id} Comment={request.comment}")
    return {"status": "success", "message": f"Action '{request.action}' recorded. Awaiting final operational sign-off."}

@app.post("/api/report")
def report_crisis(report: ManualCrisisReport = Body(...)):
    """
    Submit a manual crisis report.
    This report is logged but NOT automatically added to the active crisis list 
    to prevent unverified data from triggering system responses.
    """
    # In a real system, this would write to a DB with status="verification_pending"
    # For this prototype, we print to console and return a success message
    print(f"MANUAL REPORT RECEIVED: {report.title} @ {report.location} (Severity: {report.severity})")
    
    # We can also mock a response that includes the created object status
    return {
        "status": "success", 
        "message": "Crisis reported. Status set to 'Awaiting Verification'.",
        "data": {
            **report.dict(),
            "status": "awaiting_verification",
            "confidence": "low",
            "escalation_allowed": False
        }
    }

# --- Static Files (Must be last) ---
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

# Mount the static directory
frontend_dist = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "frontend", "dist")

if os.path.exists(frontend_dist):
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="assets")
    
    @app.get("/{full_path:path}")
    async def serve_app(full_path: str):
        # Serve index.html for any known non-api path (SPA routing)
        # But we need to be careful not to hide API routes if they were defined below (they aren't)
        # However, "full_path" will match everything. 
        # Typically we mount static files at root or handle 404s.
        # Better approach for SPA with FastAPI:
        
        file_path = os.path.join(frontend_dist, full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
            
        return FileResponse(os.path.join(frontend_dist, "index.html"))
else:
    print(f"WARNING: Frontend dist not found at {frontend_dist}")

