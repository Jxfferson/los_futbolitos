# backend/app.py
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
        password = data.get('contraseña')  # Nota: tu frontend envía "contraseña"

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
                'rol': user.rol
            }
        }), 200

    # === RUTAS DE PRODUCTOS ===
    @app.route('/api/productos', methods=['GET'])
    def get_productos():
        categoria = request.args.get('categoria')  # ?categoria=hombre
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

    # === RUTA DE SALUD (para probar) ===
    @app.route('/health', methods=['GET'])
    def health():
        return jsonify({'status': 'OK'}), 200

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=3000)