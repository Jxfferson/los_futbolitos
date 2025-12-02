from sqlalchemy import Column, Integer, String, Enum
from app.db import Base

class User(Base):
    __tablename__ = "usuario"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(150), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    contraseña = Column(String(255), nullable=False)
    rol = Column(Enum("usuario", "empleado", "admin"), nullable=False, default="usuario")
