# backend/models/producto.py
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db import db
class Producto(db.Model):
    __tablename__ = "producto"

    id = Column(Integer, primary_key=True, autoincrement=True)
    sku = Column(String(100), nullable=False)
    nombre = Column(String(200), nullable=False)
    descripcion = Column(String(500))
    marca_id = Column(Integer, ForeignKey("marca.id"))
    proveedor_id = Column(Integer, ForeignKey("proveedor.id"))
    precio = Column(Integer, nullable=False)  # En pesos colombianos (sin comas)
    temporada = Column(String(100))
    genero = Column(String(50))  # "hombre", "mujer", "niño"
    imagen_url = Column(String(255))

    marca = relationship("Marca")
    proveedor = relationship("Proveedor")