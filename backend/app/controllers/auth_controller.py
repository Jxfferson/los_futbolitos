# controllers/auth_controller.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash
from models.user import User
from app.db import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.contraseña, password):
        return jsonify({'message': 'Credenciales inválidas'}), 401

    # Crear token JWT (opcional, pero recomendado para sesiones)
    access_token = create_access_token(identity={'id': user.id, 'email': user.email, 'rol': user.rol})
    return jsonify({
        'access_token': access_token,
        'user': {
            'id': user.id,
            'email': user.email,
            'nombre': user.nombre,
            'rol': user.rol
        }
    }), 200

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    nombre = data.get('nombre')
    email = data.get('email')
    contraseña = data.get('contraseña')
    rol = data.get('rol', 'usuario')  # Por defecto, usuario normal

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'El correo ya está registrado'}), 409

    # Hashear contraseña (¡importante!)
    from werkzeug.security import generate_password_hash
    hashed_pw = generate_password_hash(contraseña)

    new_user = User(nombre=nombre, email=email, contraseña=hashed_pw, rol=rol)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Usuario creado exitosamente'}), 201