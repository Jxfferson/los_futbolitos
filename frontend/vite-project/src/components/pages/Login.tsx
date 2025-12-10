// src/components/pages/Login.tsx
import type React from "react";
import { useState } from "react";
import { useAuth } from "../../context/auth-provider";

interface Props {
  changePage: (page: string) => void;
}

export default function Login({ changePage }: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      changePage("home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="text-4xl font-black">🔥</div>
        </div>

        <h1 className="text-3xl font-black text-center mb-2 text-black">¡HOLA DE NUEVO!</h1>
        <p className="text-center text-gray-600 mb-8">Inicia sesión para acceder a tu cuenta</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-black mb-2">Email</label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-50 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:bg-white transition"
              required
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
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-gray-900 text-white font-black py-3 rounded transition disabled:opacity-50"
          >
            {loading ? "Iniciando..." : "INICIAR SESIÓN"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          ¿No tienes cuenta?{" "}
          <button onClick={() => changePage("register")} className="text-black font-bold hover:underline">
            Regístrate aquí
          </button>
        </p>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Al iniciar sesión aceptas nuestros términos y condiciones
          </p>
        </div>
      </div>
    </div>
  );
}