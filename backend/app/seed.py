# backend/app/seed.py
import os
import sys

# Añade la carpeta 'backend' al path de Python
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
        # Crear marcas si no existen
        marcas_nombres = ["Nike", "Adidas", "New Balance", "Puma", "Vans", "Converse", "Balenciaga", "AMIRI", "DC"]
        for nombre in marcas_nombres:
            if not Marca.query.filter_by(nombre=nombre).first():
                db.session.add(Marca(nombre=nombre))
        
        # Crear proveedor si no existe
        if not Proveedor.query.filter_by(nombre="Proveedor General").first():
            db.session.add(Proveedor(
                nombre="Proveedor General",
                contacto_email="contacto@ejemplo.com",
                telefono="3001234567"
            ))
        
        db.session.commit()

        # Obtener IDs reales
        marcas_db = {m.nombre: m.id for m in Marca.query.all()}
        proveedor_id = Proveedor.query.first().id

        # Productos de ejemplo (ajustados a tu frontend)
        productos_data = [
            {
                "nombre": "Nike Killshot 2 Leather",
                "marca": "Nike",
                "precio": 395970,
                "genero": "hombre",
                "imagen_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            },
            {
                "nombre": "Adidas Samba OG",
                "marca": "Adidas",
                "precio": 429990,
                "genero": "hombre",
                "imagen_url": "https://assets.adidas.com/images/w_600,f_auto,q_auto/3bbecbdf584e40398446a8bf0117cf62_9366/Tenis_Samba_OG_Blanco_B75806_01_00_standard.jpg"
            },
            {
                "nombre": "Nike Air Force 1 Shadow",
                "marca": "Nike",
                "precio": 554970,
                "genero": "mujer",
                "imagen_url": "https://nikeco.vtexassets.com/arquivos/ids/536425-800-auto?v=638463882115170000&width=800&height=auto&aspect=true"
            },
            {
                "nombre": "Nike Star Runner 3",
                "marca": "Nike",
                "precio": 249990,
                "genero": "niño",
                "imagen_url": "https://tiendaspls.com/wp-content/uploads/2023/09/da2776-001_1.jpg"
            },
            {
                "nombre": "Nike ZoomX Invincible Run 3",
                "marca": "Nike",
                "precio": 899990,
                "genero": "hombre",
                "temporada": "deporte",
                "imagen_url": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c8a2e8d-2b1e-4d1d-a4e7-f5b35d57d1e0/zoomx-invincible-run-3-zapatillas-de-running-para-hombre-lKjJhD.png"
            }
        ]

        for data in productos_data:
            if not Producto.query.filter_by(nombre=data["nombre"]).first():
                prod = Producto(
                    sku=f"SKU-{data['nombre'].replace(' ', '_').lower()}",
                    nombre=data["nombre"],
                    marca_id=marcas_db[data["marca"]],
                    proveedor_id=proveedor_id,
                    precio=data["precio"],
                    genero=data["genero"],
                    temporada=data.get("temporada", "casual"),
                    descripcion="Producto de alta calidad",
                    imagen_url=data["imagen_url"]
                )
                db.session.add(prod)

        # Crear usuario de prueba
        if not User.query.filter_by(email="admin@futbolitos.com").first():
            admin = User(nombre="Admin", email="admin@futbolitos.com", rol="admin")
            admin.set_password("admin123")
            db.session.add(admin)

        db.session.commit()
        print("Base de datos poblada con marcas, productos y usuario de prueba.")
        print("Usuario de prueba: admin@futbolitos.com | Contraseña: admin123")