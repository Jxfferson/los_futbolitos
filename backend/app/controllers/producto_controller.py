# controllers/producto_controller.py
from flask import Blueprint, request, jsonify
from models.producto import Producto
from models.marca import Marca
from app.db import db

producto_bp = Blueprint('producto', __name__)

@producto_bp.route('/', methods=['GET'])
def get_productos():
    # Filtrar por categoría si se pasa como parámetro
    categoria = request.args.get('categoria')  # Ej: ?categoria=hombre
    query = Producto.query.join(Marca).add_columns(Marca.nombre.label('marca_nombre'))

    if categoria:
        # Asumiendo que tienes un campo "genero" o "categoria" en Producto
        # Puedes ajustar según tu modelo real
        if categoria == 'hombre':
            query = query.filter(Producto.genero == 'hombre')
        elif categoria == 'mujer':
            query = query.filter(Producto.genero == 'mujer')
        elif categoria == 'ninos':
            query = query.filter(Producto.genero == 'niño')
        elif categoria == 'deporte':
            query = query.filter(Producto.temporada == 'deporte')  # Ajusta según tu lógica

    productos = query.all()

    result = []
    for prod, marca_nombre in productos:
        result.append({
            'id': prod.id,
            'sku': prod.sku,
            'nombre': prod.nombre,
            'descripcion': prod.descripcion,
            'marca': marca_nombre,
            'precio': prod.precio,
            'temporada': prod.temporada,
            'genero': prod.genero,
            'imagen_url': prod.imagen_url,
            'colors': "1 color",  # Esto es un ejemplo, deberías tener un campo real o calcularlo
            'originalPrice': f"${prod.precio + 100000}",  # Ejemplo de precio original
            'discount': "20%"  # Ejemplo de descuento
        })

    return jsonify(result), 200

@producto_bp.route('/<int:producto_id>', methods=['GET'])
def get_producto(producto_id):
    producto = Producto.query.get(producto_id)
    if not producto:
        return jsonify({'message': 'Producto no encontrado'}), 404

    marca = Marca.query.get(producto.marca_id)

    return jsonify({
        'id': producto.id,
        'sku': producto.sku,
        'nombre': producto.nombre,
        'descripcion': producto.descripcion,
        'marca': marca.nombre if marca else 'Sin marca',
        'precio': producto.precio,
        'temporada': producto.temporada,
        'genero': producto.genero,
        'imagen_url': producto.imagen_url,
        'colors': "1 color",
        'originalPrice': f"${producto.precio + 100000}",
        'discount': "20%"
    }), 200