from typing import List
from datetime import datetime, timezone
from app.models import NormalizedCrisis, NormalizedResource, ResourceRecommendation

def calculate_urgency_score(crisis: NormalizedCrisis) -> float:
    # Base score from reported urgency
    score = float(crisis.urgency_score)
    
    # Modifier: Severity
    if crisis.severity.lower() == "high":
        score += 1.0
    elif crisis.severity.lower() == "moderate":
        score += 0.5
        
    # Cap at 5.0
    return min(score, 5.0)

def calculate_freshness_factor(crisis: NormalizedCrisis) -> float:
    # Simple decay: if older than 24h, reduce confidence/urgency relevance
    now = datetime.now(timezone.utc)
    diff = now - crisis.timestamp
    hours_old = diff.total_seconds() / 3600
    
    if hours_old < 6:
        return 1.0
    elif hours_old < 24:
        return 0.8
    else:
        return 0.5

def generate_recommendations(crisis: NormalizedCrisis, resources: List[NormalizedResource]) -> List[ResourceRecommendation]:
    recs = []
    
    urgency_val = calculate_urgency_score(crisis)
    freshness = calculate_freshness_factor(crisis)
    
    for res in resources:
        # Scoring Logic (Transparent Rule-Based)
        # 1. Base Score: Capacity (Normalized roughly to 0-1 range for impact, but log scale usually better. Here linear for simplicity as requested)
        # 2. Urgency Multiplier
        
        # Simplified scoring heuristic:
        # Score = (Capacity / 10000) * Urgency * Freshness
        # We assume higher capacity is better for higher urgency events.
        
        # Justification generation
        reasons = []
        
        base_capacity_score = res.capacity / 10000.0 # Arbitrary scaling to keep numbers readable
        
        # Heuristic rules
        final_score = base_capacity_score * urgency_val * freshness
        
        reasons.append(f"Base capacity {res.capacity} supports high-volume response.")
        
        if urgency_val > 3:
            reasons.append("High urgency event prioritizes massive resource pools.")
            final_score *= 1.2
        
        if freshness < 0.8:
            reasons.append("Data is older than 6h; recommendation confidence lowered.")
            # Confidence impact handled separately below
            
        # Determine confidence
        confidence = "high"
        if freshness < 0.6 or crisis.confidence == "low":
            confidence = "low"
        elif freshness < 0.9 or crisis.confidence == "medium":
            confidence = "medium"
            
        rec = ResourceRecommendation(
            resource_id=res.id,
            resource_name=res.name,
            score=round(final_score, 2),
            confidence=confidence,
            reasoning=reasons,
            details=res.details
        )
        recs.append(rec)
        
    # Rank by score descending
    recs.sort(key=lambda x: x.score, reverse=True)
    
    return recs[:3] # Return top 3
