# Emergency Response Decision-Support System

## Overview
A production-grade hackathon prototype designed to support human decision-making during emergencies. This system aggregates disaster bulletins and hospital resource availability to provide transparency-first recommendations for resource allocation.

**Core Principle**: Decision-support, NOT automation. No action is taken without explicit human confirmation.

## System Capabilities
- **Crisis Aggregation**: Normalizes data from diverse sources (e.g., Flash Flood Guidance) into a unified dashboard.
- **Rule-Based Scoring**: Ranks hospital resources based on:
    - **Urgency**: Severity of the crisis.
    - **Relevance**: Geographic and resource match.
    - **Freshness**: Penalty for stale data.
- **Explicit Uncertainty**: Visually signals confidence (High/Medium/Low) based on data age and completeness.
- **Human-in-the-Loop**: "Approve/Reject" workflow ensures human oversight.

## Limitations
- **Data Persistence**: Currently uses in-memory storage (reset on restart) for prototype simplicity.
- **Prediction**: Does NOT forecast disasters; relies strictly on reported bulletins.
- **Security**: No authentication implemented for this prototype.

## Default Credentials (User Store)
| Username | Password | Role |
|----------|----------|------|
| `admin`  | `password123` | Response Coordinator |
| `operator` | `op1` | Field Operator |

## Running the Application

The system runs as a single unified application (Frontend served by Backend).

1.  **Build Frontend**:
    ```bash
    cd frontend
    npm install
    npm run build
    ```

2.  **Start Backend**:
    ```bash
    cd backend
    pip install fastapi uvicorn pydantic
    uvicorn app.main:app --host 0.0.0.0 --port 8000
    ```

3.  **Access**:
    Open **[http://localhost:8000](http://localhost:8000)**

## Architecture
- **Backend**: FastAPI (Python) - Handles ingestion, scoring logic, and API.
- **Frontend**: React (Vite) - Glassmorphism UI for decision support.
- **Deployment**: Static frontend files are mounted and served by FastAPI.
