"use client"

import type React from "react"

import { useState } from "react"

interface Props {
  changePage: (page: string) => void
}

export default function PedidoUsuario({ changePage }: Props) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    metodoPago: "tarjeta",
  })

  const [pedidoConfirmado, setPedidoConfirmado] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPedidoConfirmado(true)
    setTimeout(() => changePage("home"), 3000)
  }

  if (pedidoConfirmado) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card rounded-lg shadow-xl p-8 text-center max-w-md">
          <div className="text-6xl mb-6">✓</div>
          <h1 className="text-3xl font-bold text-foreground mb-2">¡Pedido confirmado!</h1>
          <p className="text-muted-foreground mb-6">
            Gracias por tu compra. Recibirás un correo de confirmación en breve.
          </p>
          <p className="text-sm text-muted-foreground">Redirigiendo a la tienda...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <button
          onClick={() => changePage("home")}
          className="mb-6 flex items-center gap-2 text-foreground hover:text-accent transition-colors"
        >
          ← Volver a la tienda
        </button>

        <div className="bg-card rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">Completar pedido</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Datos personales */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-foreground">Información personal</h2>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Nombre completo</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
            </div>

            {/* Dirección de envío */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-foreground">Dirección de envío</h2>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Ciudad</label>
                  <input
                    type="text"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Código postal</label>
                  <input
                    type="text"
                    name="codigoPostal"
                    value={formData.codigoPostal}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Método de pago */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-foreground">Método de pago</h2>

              <div>
                <select
                  name="metodoPago"
                  value={formData.metodoPago}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="tarjeta">Tarjeta de crédito/débito</option>
                  <option value="paypal">PayPal</option>
                  <option value="transferencia">Transferencia bancaria</option>
                </select>
              </div>
            </div>

            {/* Resumen */}
            <div className="bg-secondary rounded-lg p-4 space-y-3">
              <div className="flex justify-between text-foreground">
                <span>Subtotal:</span>
                <span>$150.00</span>
              </div>
              <div className="flex justify-between text-foreground">
                <span>Envío:</span>
                <span>$10.00</span>
              </div>
              <div className="flex justify-between text-foreground border-t border-border pt-3">
                <span className="font-bold text-lg">Total:</span>
                <span className="font-bold text-lg text-accent">$160.00</span>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => changePage("home")}
                className="flex-1 bg-secondary text-foreground py-3 px-6 rounded-lg hover:bg-muted transition-colors font-bold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 bg-accent text-accent-foreground py-3 px-6 rounded-lg hover:bg-accent/90 transition-colors font-bold"
              >
                Confirmar pedido
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
