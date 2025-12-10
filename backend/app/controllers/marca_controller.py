# controllers/marca_controller.py
from flask import Blueprint, jsonify
from models.marca import Marca
from app.db import db

marca_bp = Blueprint('marca', __name__)

@marca_bp.route('/', methods=['GET'])
def get_marcas():
    marcas = Marca.query.all()
    result = [{
        'id': m.id,
        'name': m.nombre,
        'image': f"https://via.placeholder.com/150?text={m.nombre}"  # Reemplaza con URL real
    } for m in marcas]
    return jsonify(result), 200