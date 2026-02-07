import json
import os
from glob import glob
from typing import List
from datetime import datetime
from app.models import (
    DisasterData1, DisasterData2, HospitalResourceData,
    NormalizedCrisis, NormalizedResource, User
)

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "data")

def load_users() -> List[User]:
    users = []
    u_path = os.path.join(DATA_DIR, "users.json")
    if os.path.exists(u_path):
        with open(u_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            for item in data:
                users.append(User(**item))
    return users

def load_disaster_data() -> List[NormalizedCrisis]:
    crises = []

    # Mapping raw types to Human Readable Identities
    TYPE_MAP = {
        "flash_flood_guidance": "Flash Flood Risk",
        "regional_advisory": "Regional Advisory",
        "medical_emergency": "Medical Infrastructure",
        "fire_alert": "Wildfire Alert"
    }

    # Helper to normalize severity strictly to [Low, Warning, Critical]
    def normalize_severity(sev: str, urgency: int) -> str:
        s = sev.lower()
        if "critical" in s or urgency >= 5: return "Critical"
        if "warning" in s or "high" in s or urgency >= 4: return "Warning"
        return "Low"

    # 1. Load Flash Flood Data (Dataset A)
    path_a = os.path.join(DATA_DIR, "disaster_1.json")
    if os.path.exists(path_a):
        with open(path_a, "r", encoding="utf-8") as f:
            data = json.load(f)
            if isinstance(data, dict):
                 data = [data]
            
            for item in data:
                try:
                    confidence_raw = item.get("confidence", "low").lower()
                    urgency = item.get("urgency", 1)
                    raw_type = item.get("type", "Alert")
                    
                    nc = NormalizedCrisis(
                        id=item.get("id"),
                        title=f"{TYPE_MAP.get(raw_type, 'Incident Report')}",
                        source=item.get("source", "Satellite Feed"),
                        timestamp=datetime.fromisoformat(item.get("reported_at").replace('Z', '+00:00')),
                        locations=item.get("locations", []),
                        urgency_score=urgency,
                        severity=normalize_severity(item.get("severity_level", "low"), urgency),
                        confidence=confidence_raw if confidence_raw in ["high", "medium", "low"] else "medium",
                        summary=item.get("summary", "Sensor data indicates potential atmospheric change in the region."),
                        raw_data_type="disaster_a"
                    )
                    crises.append(nc)
                except Exception as e:
                    print(f"Error parsing Dataset A item: {e}")

    # 2. Load Regional Flood Data (Dataset B)
    path_b = os.path.join(DATA_DIR, "disaster_2.json")
    if os.path.exists(path_b):
        with open(path_b, "r", encoding="utf-8") as f:
            data = json.load(f)
            if isinstance(data, dict):
                 data = [data]

            for item in data:
                try:
                    urgency = item.get("urgency", 1)
                    raw_type = item.get("type", "Alert")
                    nc = NormalizedCrisis(
                        id=item.get("id"),
                        title=f"{TYPE_MAP.get(raw_type, 'Regional Monitoring')}",
                        source=item.get("source", "Regional Network"),
                        timestamp=datetime.fromisoformat(item.get("reported_at").replace('Z', '+00:00')),
                        locations=item.get("regions_covered", []),
                        urgency_score=urgency,
                        severity=normalize_severity(item.get("severity_level", "low"), urgency),
                        confidence=item.get("confidence", "medium").lower(),
                        summary=item.get("summary", "Baseline regional metrics reported; active tracking established."),
                        raw_data_type="disaster_b"
                    )
                    crises.append(nc)
                except Exception as e:
                    print(f"Error parsing Dataset B item: {e}")

    # 3. Load Hospital Resources as Bulletins (Dataset C)
    path_c = os.path.join(DATA_DIR, "hospital_resources.json")
    if os.path.exists(path_c):
        # MOCKING SPECIFIC HOSPITAL SCENARIOS FOR MISSION CONTROL FEEL
        mock_hospitals = [
            {
                "name": "Osmania General Hospital",
                "icu": 0, "loc": "Hyderabad, Telangana",
                "source": "Facility Coordination Hub",
                "conf": "high",
                "summary": "Facility reached zero-capacity for ICU beds. Critical patients require immediate redistribution to nearby centers."
            },
            {
                "name": "Gandhi Medical Center",
                "icu": 3, "loc": "Secunderabad, Telangana",
                "source": "Automated Facility Log",
                "conf": "medium",
                "summary": "Operating at 92% ICU capacity. High influx of trauma cases reported in the last 60 minutes."
            },
            {
                "name": "Sunrise Community Health",
                "icu": 15, "loc": "Warangal, Telangana",
                "source": "NGO Field Report",
                "conf": "low",
                "summary": "Unverified report of localized power failure potentially affecting refrigeration for medical supplies."
            }
        ]
        
        for h in mock_hospitals:
            icu = h["icu"]
            if icu == 0:
                urgency = 5
                sev = "Critical"
            elif icu <= 5:
                urgency = 4
                sev = "Warning"
            else:
                urgency = 2
                sev = "Low"
                
            nc = NormalizedCrisis(
                id=f"hosp_{h['name'].replace(' ', '_')}",
                title=f"Health Infrastructure",
                source=h["source"],
                timestamp=datetime.now(),
                locations=[h['loc']],
                urgency_score=urgency,
                severity=sev,
                confidence=h["conf"],
                summary=h["summary"],
                raw_data_type="hospital_status"
            )
            crises.append(nc)

    return sorted(crises, key=lambda x: x.urgency_score, reverse=True)

def load_hospital_resources() -> List[NormalizedResource]:
    resources = []
    res_path = os.path.join(DATA_DIR, "hospital_resources.json")
    
    if os.path.exists(res_path):
        with open(res_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            h_obj = HospitalResourceData(**data)
            for i, item in enumerate(h_obj.resources):
                norm = NormalizedResource(
                    id=f"RES_AGG_{i}",
                    name=item.category,
                    capacity=item.grand_total,
                    details={
                        "DME": item.DME,
                        "DM_RHS": item.DM_RHS,
                        "DPH": item.DPH,
                        "DIR_ESI": item.DIR_ESI
                    }
                )
                resources.append(norm)
    return resources
