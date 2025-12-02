from pydantic import BaseModel
from typing import Optional

class ProductoBase(BaseModel):
    sku: str
    nombre: str
    descripcion: Optional[str]
    marca_id: int
    proveedor_id: Optional[int]
    precio: int
    temporada: Optional[str]
    genero: Optional[str]
    imagen_url: Optional[str]

class ProductoCreate(ProductoBase):
    pass

class ProductoOut(ProductoBase):
    id: int
    class Config:
        orm_mode = True
