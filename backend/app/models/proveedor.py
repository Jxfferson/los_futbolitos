from sqlalchemy import Column, Integer, String
from app.db import Base

class Proveedor(Base):
    __tablename__ = "proveedor"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(150), nullable=False)
    contacto_email = Column(String(150))
    telefono = Column(String(50))
