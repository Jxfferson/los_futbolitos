from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db import Base

class PedidoDetalle(Base):
    __tablename__ = "pedido_detalle"

    id = Column(Integer, primary_key=True, autoincrement=True)
    pedido_id = Column(Integer, ForeignKey("pedido.id"))
    producto_id = Column(Integer, ForeignKey("producto.id"))
    cantidad = Column(Integer, nullable=False)

    pedido = relationship("Pedido", back_populates="detalles")
    producto = relationship("Producto")
