from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.security import get_db, require_role
from app.models.user import User
from app.models.producto import Producto

router = APIRouter()

@router.get("/usuarios", dependencies=[Depends(require_role("admin"))])
def list_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@router.get("/productos", dependencies=[Depends(require_role("admin"))])
def list_products_admin(db: Session = Depends(get_db)):
    return db.query(Producto).all()
