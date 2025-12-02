from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db import SessionLocal
from app.schemas.pedido_schema import PedidoCreate, PedidoOut
from app.models.pedido import Pedido
from app.models.pedido_detalle import PedidoDetalle
from app.utils.security import get_db, get_current_user, require_role

router = APIRouter()

@router.post("/", response_model=PedidoOut)
def create_order(payload: PedidoCreate, db: Session = Depends(get_db), user = Depends(get_current_user)):
    pedido = Pedido(usuario_id=user.id, estado="pendiente")
    db.add(pedido)
    db.commit()
    db.refresh(pedido)
    for item in payload.items:
        detalle = PedidoDetalle(pedido_id=pedido.id, producto_id=item.producto_id, cantidad=item.cantidad)
        db.add(detalle)
    db.commit()
    db.refresh(pedido)
    return pedido

@router.get("/mis", response_model=List[PedidoOut])
def my_orders(db: Session = Depends(get_db), user = Depends(get_current_user)):
    pedidos = db.query(Pedido).filter(Pedido.usuario_id == user.id).all()
    return pedidos

@router.put("/{pedido_id}/estado", dependencies=[Depends(require_role("empleado"))])
def change_state(pedido_id: int, estado: str, db: Session = Depends(get_db), user = Depends(get_current_user)):
    pedido = db.query(Pedido).filter(Pedido.id == pedido_id).first()
    if not pedido:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")
    pedido.estado = estado
    db.add(pedido)
    db.commit()
    return {"ok": True, "estado": estado}
