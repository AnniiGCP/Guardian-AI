from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, WebSocket, WebSocketDisconnect, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.session import SessionAnalysis

router = APIRouter(tags=["session"])


def _session_contract(session: SessionAnalysis) -> dict:
	flags = session.raw_flag_json if isinstance(session.raw_flag_json, list) else []
	categories = sorted({flag.get("type") for flag in flags if isinstance(flag, dict) and flag.get("type")})
	return {
		"session_id": str(session.id),
		"platform": session.platform,
		"timestamp": session.created_at.isoformat(),
		"risk_score": session.risk_score or 0,
		"confidence": session.confidence or 0,
		"grooming_stage": session.grooming_stage or "none",
		"flags": flags,
		"categories": categories,
		"stage_progression": session.stage_progression_json or {},
		"recommendation": session.recommendation or "monitor",
		"drift_signals": session.drift_json or {},
	}


@router.get("/session/{session_id}", status_code=status.HTTP_200_OK)
def get_session(session_id: UUID, db: Session = Depends(get_db)) -> dict:
	session = db.get(SessionAnalysis, session_id)
	if session is None:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="session not found")
	return _session_contract(session)


@router.get("/sessions", status_code=status.HTTP_200_OK)
def get_sessions(
	db: Session = Depends(get_db),
	limit: int = Query(default=50, ge=1, le=100),
	offset: int = Query(default=0, ge=0),
) -> list[dict]:
	sessions = (
		db.query(SessionAnalysis)
		.order_by(SessionAnalysis.created_at.desc())
		.offset(offset)
		.limit(limit)
		.all()
	)
	return [_session_contract(session) for session in sessions]


@router.websocket("/ws/alerts")
async def alerts(websocket: WebSocket) -> None:
	await websocket.accept()
	try:
		while True:
			await websocket.receive_text()
	except WebSocketDisconnect:
		return
