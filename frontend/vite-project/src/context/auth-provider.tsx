// src/context/auth-provider.tsx
import { createContext, useState, useContext, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  nombre: string;
  rol: string;
}

interface AuthContextType {
  user: User | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  register: (data: { email: string; password: string; nombre: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (data: { email: string; password: string }) => {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Credenciales inválidas");
    }

    setUser(result.user);
    localStorage.setItem("user", JSON.stringify(result.user));
  };

  const register = async (data: { email: string; password: string; nombre: string }) => {
    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: data.nombre,
        email: data.email,
        contraseña: data.password, // Backend espera "contraseña"
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Error al registrar usuario");
    }

    // Opcional: loguear automáticamente tras registro
    await login({ email: data.email, password: data.password });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};