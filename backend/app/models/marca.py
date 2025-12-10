# backend/models/marca.py
from sqlalchemy import Column, Integer, String
from app.db import db
class Marca(db.Model):
    __tablename__ = "marca"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(String(255))