"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "../../context/auth-provider"

interface Props {
  changePage: (page: string) => void
}

export default function Register({ changePage }: Props) {
  const { register } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nombre, setNombre] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password || !nombre || !confirmPassword) {
      setError("Por favor completa todos los campos")
      return
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    try {
      setLoading(true)
      await register({ email, password, nombre })
      changePage("home")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error en el registro")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Nike Logo */}
        <div className="flex justify-center mb-8">
          <div className="text-4xl font-black">🔥</div>
        </div>

        <h1 className="text-3xl font-black text-center mb-2 text-black">ÚNETE A NOSOTROS</h1>
        <p className="text-center text-gray-600 mb-8">Crea tu cuenta para acceder a nuestras mejores colecciones</p>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-black mb-2">Nombre Completo</label>
            <input
              type="text"
              placeholder="Juan Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-50 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">Email</label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-50 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-50 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">Confirmar Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-50 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:bg-white transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-gray-900 text-white font-black py-3 rounded transition disabled:opacity-50"
          >
            {loading ? "Registrando..." : "REGISTRARSE"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          ¿Ya tienes cuenta?{" "}
          <button onClick={() => changePage("login")} className="text-black font-bold hover:underline">
            Inicia sesión
          </button>
        </p>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">Al registrarte aceptas nuestros términos y condiciones</p>
        </div>
      </div>
    </div>
  )
}
