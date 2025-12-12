from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db import SessionLocal
from app.schemas.producto_schema import ProductoCreate, ProductoOut
from app.models.producto import Producto
from app.utils.security import get_db, get_current_user, require_role

router = APIRouter()

@router.get("/", response_model=List[ProductoOut])
def list_products(db: Session = Depends(get_db)):
    prods = db.query(Producto).all()
    return prods

@router.get("/{product_id}", response_model=ProductoOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    p = db.query(Producto).filter(Producto.id == product_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return p

@router.post("/", response_model=ProductoOut, dependencies=[Depends(require_role("admin"))])
def create_product(payload: ProductoCreate, db: Session = Depends(get_db)):
    p = Producto(**payload.dict())
    db.add(p)
    db.commit()
    db.refresh(p)
    return p

@router.put("/{product_id}", response_model=ProductoOut, dependencies=[Depends(require_role("admin"))])
def update_product(product_id: int, payload: ProductoCreate, db: Session = Depends(get_db)):
    p = db.query(Producto).filter(Producto.id == product_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    for k,v in payload.dict().items():
        setattr(p, k, v)
    db.add(p)
    db.commit()
    db.refresh(p)
    return p

@router.delete("/{product_id}", dependencies=[Depends(require_role("admin"))])
def delete_product(product_id: int, db: Session = Depends(get_db)):
    p = db.query(Producto).filter(Producto.id == product_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    db.delete(p)
    db.commit()
    return {"ok": True}
