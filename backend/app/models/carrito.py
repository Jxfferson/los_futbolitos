# backend/app/models/carrito.py
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db import db
from .user import User      # ← Importar User aquí
from .producto import Producto

class Carrito(db.Model):
    __tablename__ = "carrito"
    id = Column(Integer, primary_key=True, autoincrement=True)
    usuario_id = Column(Integer, ForeignKey("usuario.id"), unique=True)
    usuario = relationship("User", back_populates="carrito")
    items = relationship("CarritoItem", back_populates="carrito")  # ← Aquí va items

class CarritoItem(db.Model):
    __tablename__ = "carrito_item"
    id = Column(Integer, primary_key=True, autoincrement=True)
    carrito_id = Column(Integer, ForeignKey("carrito.id"))
    producto_id = Column(Integer, ForeignKey("producto.id"))
    cantidad = Column(Integer, nullable=False, default=1)

    carrito = relationship("Carrito", back_populates="items")
    producto = relationship("Producto")