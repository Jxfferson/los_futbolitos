"use client"

import type React from "react"

import { useState } from "react"

interface Props {
  changePage: (page: string) => void
}

export default function Productos({ changePage }: Props) {
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Nike Air Max", marca: "Nike", precio: 150, stock: 45 },
    { id: 2, nombre: "Adidas Ultraboost", marca: "Adidas", precio: 180, stock: 32 },
    { id: 3, nombre: "New Balance 990", marca: "New Balance", precio: 160, stock: 28 },
    { id: 4, nombre: "Balenciaga Speed", marca: "Balenciaga", precio: 595, stock: 15 },
  ])

  const [nuevoProducto, setNuevoProducto] = useState({ nombre: "", marca: "", precio: "", stock: "" })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const handleAgregar = (e: React.FormEvent) => {
    e.preventDefault()
    if (nuevoProducto.nombre && nuevoProducto.marca && nuevoProducto.precio && nuevoProducto.stock) {
      setProductos([
        ...productos,
        {
          id: productos.length + 1,
          nombre: nuevoProducto.nombre,
          marca: nuevoProducto.marca,
          precio: Number.parseFloat(nuevoProducto.precio),
          stock: Number.parseInt(nuevoProducto.stock),
        },
      ])
      setNuevoProducto({ nombre: "", marca: "", precio: "", stock: "" })
      setMostrarFormulario(false)
    }
  }

  const handleEliminar = (id: number) => {
    setProductos(productos.filter((p) => p.id !== id))
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    changePage("login")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Gestión de Productos</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Botón agregar */}
          <div className="flex gap-4">
            <button
              onClick={() => setMostrarFormulario(!mostrarFormulario)}
              className="px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-bold"
            >
              + Nuevo Producto
            </button>
            <button
              onClick={() => changePage("admin-dashboard")}
              className="px-6 py-3 bg-secondary text-foreground rounded-lg hover:bg-muted transition-colors font-bold"
            >
              Volver al panel
            </button>
          </div>

          {/* Formulario agregar */}
          {mostrarFormulario && (
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Agregar nuevo producto</h2>
              <form onSubmit={handleAgregar} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={nuevoProducto.nombre}
                  onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
                  className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <input
                  type="text"
                  placeholder="Marca"
                  value={nuevoProducto.marca}
                  onChange={(e) => setNuevoProducto({ ...nuevoProducto, marca: e.target.value })}
                  className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <input
                  type="number"
                  placeholder="Precio"
                  value={nuevoProducto.precio}
                  onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
                  className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={nuevoProducto.stock}
                  onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
                  className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  type="submit"
                  className="md:col-span-4 px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-bold"
                >
                  Agregar
                </button>
              </form>
            </div>
          )}

          {/* Tabla de productos */}
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Inventario ({productos.length})</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Producto</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Marca</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Precio</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Stock</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {productos.map((producto) => (
                    <tr key={producto.id} className="hover:bg-secondary transition-colors">
                      <td className="px-6 py-4 text-sm text-foreground">{producto.nombre}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{producto.marca}</td>
                      <td className="px-6 py-4 text-sm text-foreground font-bold">${producto.precio}</td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            producto.stock > 20
                              ? "bg-green-100 text-green-800"
                              : producto.stock > 10
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {producto.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleEliminar(producto.id)}
                          className="px-3 py-1 bg-destructive text-destructive-foreground rounded-lg text-xs hover:bg-destructive/90 transition-colors"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
