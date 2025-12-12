# backend/app/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from app.db import db, init_db
from app.models.user import User
from app.models.marca import Marca
from app.models.proveedor import Proveedor
from app.models.producto import Producto

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/snkrs_futbolitos'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        'pool_pre_ping': True,
        'pool_recycle': 300,
    }

    init_db(app)

    # === RUTAS DE AUTH ===
    @app.route('/auth/register', methods=['POST'])
    def register():
        data = request.get_json()
        nombre = data.get('nombre')
        email = data.get('email')
        password = data.get('contraseña')

        if not nombre or not email or not password:
            return jsonify({'message': 'Faltan datos'}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({'message': 'El correo ya está registrado'}), 409

        new_user = User(nombre=nombre, email=email, rol='usuario')
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'Usuario creado'}), 201

    @app.route('/auth/login', methods=['POST'])
    def login():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()

        if not user or not user.check_password(password):
            return jsonify({'message': 'Credenciales inválidas'}), 401

        return jsonify({
            'user': {
                'id': str(user.id),
                'email': user.email,
                'nombre': user.nombre,
                'rol': user.rol,
                'avatar': getattr(user, 'avatar', None)
            }
        }), 200

    # === RUTA PARA SUBIR ZAPATO (solo admin) ===
    @app.route('/api/zapatos', methods=['POST'])
    def crear_zapato():
        data = request.get_json()

        required = ["nombre", "marca_id", "precio", "genero", "imagen_url"]
        for field in required:
            if not data.get(field):
                return jsonify({'message': f'Falta el campo: {field}'}), 400

        user_id = data.get('usuario_id')
        if not user_id:
            return jsonify({'message': 'Se requiere ID de usuario'}), 400

        user = User.query.get(user_id)
        if not user or user.rol != "admin":
            return jsonify({'message': 'Acceso denegado: solo administradores pueden subir zapatos'}), 403

        marca = Marca.query.get(data['marca_id'])
        if not marca:
            return jsonify({'message': 'Marca no válida'}), 400

        proveedor = Proveedor.query.first()
        if not proveedor:
            proveedor = Proveedor(nombre="Proveedor General", contacto_email="contacto@ejemplo.com", telefono="0000000000")
            db.session.add(proveedor)
            db.session.commit()

        nuevo_zapato = Producto(
            sku=f"SKU-{data['nombre'].replace(' ', '_').lower()}",
            nombre=data['nombre'],
            marca_id=data['marca_id'],
            proveedor_id=proveedor.id,
            precio=int(data['precio']),
            genero=data.get('genero', 'hombre'),
            temporada=data.get('temporada', 'casual'),
            descripcion=data.get('descripcion', ''),
            imagen_url=data['imagen_url']
        )

        try:
            db.session.add(nuevo_zapato)
            db.session.commit()
            return jsonify({'message': 'Zapato creado con éxito', 'id': nuevo_zapato.id}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': 'Error al crear zapato', 'error': str(e)}), 500

    # === RUTAS DE PRODUCTOS ===
    @app.route('/api/productos', methods=['GET'])
    def get_productos():
        categoria = request.args.get('categoria')
        query = Producto.query

        if categoria:
            if categoria == 'hombre':
                query = query.filter(Producto.genero == 'hombre')
            elif categoria == 'mujer':
                query = query.filter(Producto.genero == 'mujer')
            elif categoria == 'ninos':
                query = query.filter(Producto.genero == 'niño')
            elif categoria == 'deporte':
                query = query.filter(Producto.temporada == 'deporte')

        productos = query.all()
        result = []
        for p in productos:
            marca = Marca.query.get(p.marca_id)
            result.append({
                'id': p.id,
                'nombre': p.nombre,
                'categoria': f"Calzado para {p.genero}",
                'colors': "1 color",
                'price': f"${p.precio:,.0f}".replace(",", "."),
                'originalPrice': f"${(p.precio * 1.3):,.0f}".replace(",", "."),
                'discount': "20%",
                'image': p.imagen_url or "https://via.placeholder.com/300"
            })
        return jsonify(result), 200

    # === RUTAS DE MARCAS ===
    @app.route('/api/marcas', methods=['GET'])
    def get_marcas():
        marcas = Marca.query.all()
        result = []
        for m in marcas:
            result.append({
                'name': m.nombre,
                'image': f"https://via.placeholder.com/150?text={m.nombre}"
            })
        return jsonify(result), 200

    # === RUTA DE SALUD ===
    @app.route('/health', methods=['GET'])
    def health():
        return jsonify({'status': 'OK'}), 200

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=3000)