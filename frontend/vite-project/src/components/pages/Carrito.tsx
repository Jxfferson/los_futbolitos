// src/components/pages/Carrito.tsx
import { useCart } from "../../context/cart-context";
import { useAuth } from "../../context/auth-provider";

export default function Carrito({ changePage }: { changePage: (page: string) => void }) {
  const { items, removeItem, clearCart, totalPrice } = useCart();
  const { user } = useAuth();

  const handleCheckout = () => {
    if (!user) {
      alert("Debes iniciar sesión para comprar");
      changePage("login");
      return;
    }
    // ✅ Redirige directamente a la simulación (sin carga real)
    changePage("simulacion-pago");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
        <button
          onClick={() => changePage("home")}
          className="px-6 py-2 bg-black text-white rounded font-bold hover:bg-gray-800 transition"
        >
          Seguir comprando
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Carrito de compras</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center border-b pb-4">
                <img
                  src={item.image}
                  alt={item.nombre}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold">{item.nombre}</h3>
                  <p className="text-gray-600">{item.marca}</p>
                  <p className="text-lg font-bold">${item.precio.toLocaleString("es-CO")}</p>
                </div>
                <div className="flex items-center">
                  <span className="mx-2 font-medium">{item.cantidad}</span>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 ml-4 hover:text-red-700 transition"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          {/* Resumen y acciones */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Resumen</h2>
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-700">Total:</span>
              <span className="font-bold text-xl">${totalPrice.toLocaleString("es-CO")}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full mt-4 bg-black text-white py-3 rounded font-bold hover:bg-gray-800 transition"
            >
              Proceder al pago
            </button>
            <button
              onClick={clearCart}
              className="w-full mt-2 text-gray-600 underline font-medium hover:text-gray-800 transition"
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}