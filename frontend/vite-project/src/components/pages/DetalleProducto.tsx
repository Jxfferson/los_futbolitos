"use client"

import { useState } from "react"

interface Props {
  changePage: (page: string) => void
  productId?: number | null
}

export default function DetalleProducto({ changePage, productId }: Props) {
  const [cantidad, setCantidad] = useState(1)

  // Datos simulados del producto
  const producto = {
    id: productId || 1,
    nombre: "Nike Air Max",
    marca: "Nike",
    precio: 150,
    precioOriginal: 200,
    imagen: "/nike-air-max.jpg",
    descripcion: "Las icónicas Nike Air Max con diseño retro y comodidad máxima. Perfectas para cualquier ocasión.",
    tallas: ["6", "7", "8", "9", "10", "11", "12", "13"],
    colores: ["Negro", "Blanco", "Azul", "Rojo"],
    especificaciones: {
      material: "Cuero y malla",
      suela: "Aire comprimido",
      tecnologia: "Air Max",
      garantia: "1 año",
    },
    resenas: [
      { usuario: "Juan", calificacion: 5, comentario: "Excelentes zapatos, muy cómodos" },
      { usuario: "María", calificacion: 4, comentario: "Buena calidad, recomendado" },
    ],
  }

  const handleAgregarCarrito = () => {
    console.log(`Agregando ${cantidad} unidades del producto ${producto.id}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header con botón volver */}
        <button
          onClick={() => changePage("home")}
          className="mb-6 flex items-center gap-2 text-foreground hover:text-accent transition-colors"
        >
          ← Volver a la tienda
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Imagen del producto */}
          <div className="flex items-center justify-center bg-secondary rounded-lg p-8">
            <img
              src={producto.imagen || "/placeholder.svg"}
              alt={producto.nombre}
              className="max-w-full max-h-96 object-contain"
            />
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{producto.marca}</p>
              <h1 className="text-4xl font-bold text-foreground mb-4">{producto.nombre}</h1>
              <p className="text-foreground/80">{producto.descripcion}</p>
            </div>

            {/* Precios */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-accent">${producto.precio}</span>
              <span className="text-lg text-muted-foreground line-through">${producto.precioOriginal}</span>
              <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                {Math.round(((producto.precioOriginal - producto.precio) / producto.precioOriginal) * 100)}% OFF
              </span>
            </div>

            {/* Tallas */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Talla</label>
              <div className="grid grid-cols-4 gap-2">
                {producto.tallas.map((talla) => (
                  <button
                    key={talla}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                  >
                    {talla}
                  </button>
                ))}
              </div>
            </div>

            {/* Colores */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Color</label>
              <div className="flex gap-3">
                {producto.colores.map((color) => (
                  <button
                    key={color}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors text-sm"
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Cantidad */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Cantidad</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  className="px-4 py-2 bg-secondary rounded-lg hover:bg-muted transition-colors"
                >
                  −
                </button>
                <span className="text-lg font-bold">{cantidad}</span>
                <button
                  onClick={() => setCantidad(cantidad + 1)}
                  className="px-4 py-2 bg-secondary rounded-lg hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleAgregarCarrito}
                className="flex-1 bg-accent text-accent-foreground py-3 px-6 rounded-lg hover:bg-accent/90 transition-colors font-bold text-lg"
              >
                Agregar al carrito
              </button>
              <button
                onClick={() => changePage("pedido-usuario")}
                className="flex-1 bg-primary text-primary-foreground py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors font-bold"
              >
                Comprar ahora
              </button>
            </div>

            {/* Especificaciones */}
            <div className="bg-secondary rounded-lg p-4 space-y-2">
              <h3 className="font-bold text-foreground">Especificaciones</h3>
              {Object.entries(producto.especificaciones).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-muted-foreground capitalize">{key}:</span>
                  <span className="text-foreground font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reseñas */}
        <div className="mt-12 bg-secondary rounded-lg p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Reseñas de clientes</h2>
          <div className="space-y-4">
            {producto.resenas.map((resena, idx) => (
              <div key={idx} className="border-b border-border pb-4 last:border-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-foreground">{resena.usuario}</span>
                  <span className="text-accent">★ {resena.calificacion}/5</span>
                </div>
                <p className="text-foreground/80">{resena.comentario}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
