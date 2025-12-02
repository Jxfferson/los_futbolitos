from sqlalchemy import Column, Integer, String
from app.db import Base

class Bodega(Base):
    __tablename__ = "bodega"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(100), nullable=False)
    direccion = Column(String(200))
    capacidad = Column(Integer)
