import { useState, useEffect } from "react";
import { fetchProductos } from "../../api/productos";
import type { Producto } from "../../api/productos";
import { useAuth } from "../../context/auth-provider"; // ← ¡ESTA LÍNEA FALTABA!
interface Props {
  changePage: (page: string) => void;
}

export default function Productos({ changePage }: Props) {
  const { user, logout } = useAuth();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        const data = await fetchProductos(categoriaFiltro || undefined);
        setProductos(data);
        setError(null);
      } catch (err) {
        setError("No se pudieron cargar los productos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    cargarProductos();
  }, [categoriaFiltro]);

  const handleLogout = () => {
    logout();
    changePage("login");
  };

  const categorias = [
    { id: null, label: "Todos" },
    { id: "hombre", label: "Hombre" },
    { id: "mujer", label: "Mujer" },
    { id: "ninos", label: "Niños" },
    { id: "deporte", label: "Deporte" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black">Catálogo de Productos</h1>
          <div className="flex gap-4">
            {user?.rol === "admin" && (
              <button
                onClick={() => changePage("admin")}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-black transition"
              >
                Panel Admin
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Filtros */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-3 mb-6">
          {categorias.map((cat) => (
            <button
              key={cat.id || "todos"}
              onClick={() => setCategoriaFiltro(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                categoriaFiltro === cat.id
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Estado de carga o error */}
        {loading ? (
          <p className="text-center py-10 text-gray-600">Cargando productos...</p>
        ) : error ? (
          <p className="text-center py-10 text-red-600">{error}</p>
        ) : productos.length === 0 ? (
          <p className="text-center py-10 text-gray-500">No hay productos en esta categoría</p>
        ) : (
          /* Grid de productos */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={producto.image}
                    alt={producto.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{producto.nombre}</h3>
                  <p className="text-xs text-gray-500 mb-2">{producto.categoria}</p>
                  <p className="text-xs text-gray-400 mb-1">{producto.colors}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-black">{producto.price}</span>
                    <span className="text-xs text-gray-400 line-through">
                      {producto.originalPrice}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-green-600 mt-1">{producto.discount} OFF</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}