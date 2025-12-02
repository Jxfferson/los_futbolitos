"use client"

import { createContext, useState, useContext } from "react"
import type { ReactNode } from "react"

interface User {
  id: string
  email: string
  role?: string
}

interface AuthContextType {
  user: User | null
  login: (data: { email: string; password: string }) => Promise<void>
  register: (data: { email: string; password: string; nombre: string }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = async (data: { email: string; password: string }) => {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const result = await res.json()

    if (!res.ok) throw new Error(result.message || "Error al iniciar sesión")

    setUser(result.user)
  }

  const register = async (data: { email: string; password: string; nombre: string }) => {
    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const result = await res.json()

    if (!res.ok) throw new Error(result.message || "Error al registrarse")

    setUser(result.user)
  }

  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  return context
}
