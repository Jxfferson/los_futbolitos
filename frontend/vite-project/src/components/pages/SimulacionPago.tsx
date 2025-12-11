// src/components/pages/SimulacionPago.tsx
import { useState, useEffect } from "react";
import { useCart } from "../../context/cart-context"; // ← 🔧 Corregido: "../", no "...."

interface SimulacionPagoProps {
  changePage: (page: string) => void;
}

export default function SimulacionPago({ changePage }: SimulacionPagoProps) {
  const { clearCart } = useCart();
  const [estado, setEstado] = useState<"cargando" | "exito" | "error">("cargando");

  useEffect(() => {
    const timer = setTimeout(() => {
      const exito = Math.random() > 0.1;
      setEstado(exito ? "exito" : "error");
      if (exito) {
        clearCart();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [clearCart]);

  if (estado === "cargando") {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-black mb-2">Procesando pago...</h2>
          <p className="text-gray-600">Por favor, no cierres esta ventana.</p>
        </div>
      </div>
    );
  }

  if (estado === "exito") {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-green-600 text-4xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">¡Pago exitoso!</h2>
          <p className="text-gray-600 mb-6">
            Tu pedido ha sido confirmado. Recibirás un correo con los detalles pronto.
          </p>
          <button
            onClick={() => changePage("home")}
            className="px-6 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-red-600 text-4xl">✕</span>
        </div>
        <h2 className="text-2xl font-bold text-black mb-2">Pago fallido</h2>
        <p className="text-gray-600 mb-6">
          Hubo un problema al procesar tu pago. Por favor, inténtalo de nuevo.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => changePage("carrito")}
            className="px-6 py-2 border border-gray-800 text-gray-800 font-bold rounded-full hover:bg-gray-100 transition"
          >
            Volver al carrito
          </button>
          <button
            onClick={() => changePage("home")}
            className="px-6 py-2 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition"
          >
            Explorar más
          </button>
        </div>
      </div>
    </div>
  );
}