# backend/models/proveedor.py
from sqlalchemy import Column, Integer, String
from app.db import db

class Proveedor(db.Model):
    __tablename__ = "proveedor"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(150), nullable=False)
    contacto_email = Column(String(150))
    telefono = Column(String(50))