"use client"

import { useState } from "react"

interface Props {
  changePage: (page: string) => void
}

export default function EmpleadoDashboard({ changePage }: Props) {
  const [ordenes, setOrdenes] = useState([
    { id: 1, cliente: "Juan García", estado: "Pendiente", fecha: "2024-01-15", monto: "$150" },
    { id: 2, cliente: "María López", estado: "En preparación", fecha: "2024-01-14", monto: "$200" },
    { id: 3, cliente: "Carlos Rodríguez", estado: "Listo", fecha: "2024-01-13", monto: "$120" },
  ])

  const handleActualizarEstado = (id: number) => {
    const nuevoEstado = ["Pendiente", "En preparación", "Listo", "Enviado"]
    setOrdenes(
      ordenes.map((orden) => {
        if (orden.id === id) {
          const indiceActual = nuevoEstado.indexOf(orden.estado)
          return { ...orden, estado: nuevoEstado[(indiceActual + 1) % nuevoEstado.length] }
        }
        return orden
      }),
    )
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    changePage("login")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Panel de Empleado</h1>
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
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-lg p-6 border border-border">
              <p className="text-muted-foreground text-sm mb-2">Órdenes pendientes</p>
              <p className="text-4xl font-bold text-foreground">12</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <p className="text-muted-foreground text-sm mb-2">En preparación</p>
              <p className="text-4xl font-bold text-foreground">5</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <p className="text-muted-foreground text-sm mb-2">Listas para envío</p>
              <p className="text-4xl font-bold text-foreground">8</p>
            </div>
          </div>

          {/* Tabla de órdenes */}
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Órdenes recientes</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Cliente</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Fecha</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Monto</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Estado</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {ordenes.map((orden) => (
                    <tr key={orden.id} className="hover:bg-secondary transition-colors">
                      <td className="px-6 py-4 text-sm text-foreground">#{orden.id}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{orden.cliente}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{orden.fecha}</td>
                      <td className="px-6 py-4 text-sm text-foreground font-bold">{orden.monto}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            orden.estado === "Pendiente"
                              ? "bg-yellow-100 text-yellow-800"
                              : orden.estado === "En preparación"
                                ? "bg-blue-100 text-blue-800"
                                : orden.estado === "Listo"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {orden.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleActualizarEstado(orden.id)}
                          className="px-3 py-1 bg-accent text-accent-foreground rounded-lg text-xs hover:bg-accent/90 transition-colors"
                        >
                          Actualizar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-4">
            <button
              onClick={() => changePage("productos")}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-bold"
            >
              Gestión de productos
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
