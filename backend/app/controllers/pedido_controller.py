# controllers/pedido_controller.py
from flask import Blueprint, request, jsonify
from models.pedido import Pedido
from models.usuario import User
from app.db import db

pedido_bp = Blueprint('pedido', __name__)

@pedido_bp.route('/', methods=['GET'])
def get_pedidos():
    pedidos = Pedido.query.all()
    result = []
    for p in pedidos:
        usuario = User.query.get(p.usuario_id)
        result.append({
            'id': p.id,
            'usuario': usuario.nombre if usuario else 'Desconocido',
            'estado': p.estado,
            'fecha': p.fecha.isoformat(),
            'total': sum([d.cantidad * d.producto.precio for d in p.detalles]) if p.detalles else 0
        })
    return jsonify(result), 200

@pedido_bp.route('/<int:pedido_id>', methods=['GET'])
def get_pedido(pedido_id):
    pedido = Pedido.query.get(pedido_id)
    if not pedido:
        return jsonify({'message': 'Pedido no encontrado'}), 404

    usuario = User.query.get(pedido.usuario_id)
    detalles = [{
        'producto_id': d.producto_id,
        'cantidad': d.cantidad,
        'nombre_producto': d.producto.nombre if d.producto else 'Producto eliminado'
    } for d in pedido.detalles]

    return jsonify({
        'id': pedido.id,
        'usuario': usuario.nombre if usuario else 'Desconocido',
        'estado': pedido.estado,
        'fecha': pedido.fecha.isoformat(),
        'detalles': detalles,
        'total': sum([d.cantidad * d.producto.precio for d in pedido.detalles]) if pedido.detalles else 0
    }), 200