# backend/app/seed.py
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from app.app import create_app
from app.db import db
from app.models.user import User
from app.models.marca import Marca
from app.models.proveedor import Proveedor
from app.models.producto import Producto

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        # === CREAR MARCAS ===
        marcas_nombres = ["Nike", "Adidas", "New Balance", "Puma", "Vans", "Converse", "Balenciaga", "AMIRI", "DC"]
        for nombre in marcas_nombres:
            if not Marca.query.filter_by(nombre=nombre).first():
                db.session.add(Marca(nombre=nombre))

        # === CREAR PROVEEDOR ===
        if not Proveedor.query.filter_by(nombre="Proveedor General").first():
            db.session.add(Proveedor(
                nombre="Proveedor General",
                contacto_email="contacto@ejemplo.com",
                telefono="3001234567"
            ))
        db.session.commit()

        # === IDs ===
        marcas_db = {m.nombre: m.id for m in Marca.query.all()}
        proveedor_id = Proveedor.query.first().id

        # === USUARIOS DE PRUEBA ===
        # Admin
        if not User.query.filter_by(email="admin@futbolitos.com").first():
            admin = User(nombre="Admin", email="admin@futbolitos.com", rol="admin")
            admin.set_password("admin123")
            db.session.add(admin)
            
        db.session.commit()

        print("✅ Base de datos poblada con:")
        print("   - Marcas")
        print("   - Proveedor")
        print("   - Admin: admin@futbolitos.com | Contraseña: admin123")
        print("   - Proveedor: proveedor@futbolitos.com | Contraseña: proveedor123")