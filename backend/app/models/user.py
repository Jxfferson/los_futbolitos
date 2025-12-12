# backend/app/models/user.py
from sqlalchemy import Column, Integer, String, Enum
from app.db import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = "usuario"
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(150), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    contraseña_hash = Column(String(255), nullable=False)
    # 🔥 Solo dos roles: "usuario" y "admin"
    rol = Column(Enum("usuario", "admin"), nullable=False, default="usuario")

    def set_password(self, password):
        self.contraseña_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.contraseña_hash, password)