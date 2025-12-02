from fastapi import FastAPI, Depends
from app.db import engine, Base
from app.routes import auth, productos, pedidos, admin

# Crea tablas si no existen (no afecta si ya existen)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Zapatos")

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(productos.router, prefix="/productos", tags=["productos"])
app.include_router(pedidos.router, prefix="/pedidos", tags=["pedidos"])
app.include_router(admin.router, prefix="/admin", tags=["admin"])
