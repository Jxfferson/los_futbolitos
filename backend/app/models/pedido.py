# backend/models/pedido.py
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from ..db import db

class Pedido(db.Model):
    __tablename__ = "pedido"

    id = Column(Integer, primary_key=True, autoincrement=True)
    usuario_id = Column(Integer, ForeignKey("usuario.id"))
    estado = Column(String(50), default="pendiente")
    fecha = Column(DateTime, default=datetime.utcnow)

    usuario = relationship("User")
    detalles = relationship("PedidoDetalle", back_populates="pedido")