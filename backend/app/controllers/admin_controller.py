# controllers/admin_controller.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User
from app.db import db

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    current_user = get_jwt_identity()
    if current_user['rol'] != 'admin':
        return jsonify({'message': 'Acceso denegado'}), 403

    users = User.query.all()
    result = [{
        'id': u.id,
        'nombre': u.nombre,
        'email': u.email,
        'rol': u.rol
    } for u in users]
    return jsonify(result), 200

@admin_bp.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    current_user = get_jwt_identity()
    if current_user['rol'] != 'admin':
        return jsonify({'message': 'Acceso denegado'}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'Usuario no encontrado'}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'Usuario eliminado'}), 200