// frontend/vite-project/src/components/pages/Productos.tsx
import { useState, useEffect } from "react";
import { fetchProductos } from "../../api/productos";
import type { Producto } from "../../api/productos";
import { useAuth } from "../../context/auth-provider";
import { useCart } from "../../context/cart-context"; // ← Importar carrito

interface Props {
  changePage: (page: string) => void;
}

export default function Productos({ changePage }: Props) {
  const { user, logout } = useAuth();
  const { addItem, totalItems } = useCart(); // ← totalItems para el badge del carrito
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // 👇 Función para limpiar y convertir el precio a número
  const parsePrice = (priceStr: string): number => {
    return parseFloat(
      priceStr
        .replace("$", "")
        .replace(/\./g, "") // elimina separadores de miles
        .replace(",", ".")   // por si usa coma decimal (Colombia)
    );
  };

  // 👇 Función para agregar al carrito
  const addToCart = (producto: Producto) => {
    const cartItem = {
      producto_id: producto.id,
      nombre: producto.nombre,
      precio: parsePrice(producto.price),
      cantidad: 1,
      image: producto.image,
      marca: producto.nombre.split(" ")[0] || "Sin marca",
    };
    addItem(cartItem);
    alert(`✅ ${producto.nombre} agregado al carrito`);
  };

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
      {/* HEADER — igual que en Home.tsx */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-4 mb-4">
            {/* Logo / Volver al inicio */}
            <div
              onClick={() => changePage("home")}
              className="text-2xl font-black cursor-pointer"
            >
              Los Futbolitos
            </div>

            {/* Barra de búsqueda (opcional, se puede quitar si quieres) */}
            <div className="flex-1 mx-8 max-w-md">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm placeholder-gray-500 focus:outline-none"
              />
            </div>

            {/* Carrito + Usuario */}
            <div className="flex gap-6 items-center">
              {/* Ícono de búsqueda (igual que en Home) */}
              <button className="text-gray-600 hover:text-black transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* Carrito con badge */}
              <button
                onClick={() => changePage("carrito")}
                className="relative text-gray-600 hover:text-black transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10v8a2 2 0 002 2H5a2 2 0 002-2v-8m7-1a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Menú de usuario */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center gap-2 text-black font-semibold hover:text-gray-600 transition"
                  >
                    <span className="text-sm">👋 {user.nombre}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="py-2">
                        <button
                          onClick={() => {
                            changePage("productos");
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14a4 4 0 014-4h4M12 14a4 4 0 01-4-4h-4m4 4v8m4-8v8" />
                          </svg>
                          Mi perfil
                        </button>
                        <button
                          onClick={() => {
                            changePage("productos");
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-.416 1.088-.416 1.514 0L20.488 13c1.128 1.128 1.128 3.243 0 4.371l-8.669 8.669a2.25 2.25 0 01-3.182 0l-8.669-8.669a2.25 2.25 0 010-3.182l8.669-8.669z" />
                          </svg>
                          Ajustes
                        </button>
                        <button
                          onClick={() => {
                            changePage("carrito");
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M12 13a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                          Mi carrito
                        </button>
                        <hr className="my-2 border-gray-200" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 6v-6" />
                          </svg>
                          Cerrar sesión
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => changePage("login")}
                  className="text-black font-semibold hover:text-gray-600 transition"
                >
                  Iniciar sesión
                </button>
              )}
            </div>
          </div>

          {/* Navegación secundaria */}
          <nav className="flex gap-8 text-sm font-semibold border-t border-gray-200 pt-4">
            <button onClick={() => changePage("home")} className="text-black hover:text-gray-600 transition">
              Novedades
            </button>
            <button onClick={() => setCategoriaFiltro("hombre")} className="text-black hover:text-gray-600 transition">
              Hombre
            </button>
            <button onClick={() => setCategoriaFiltro("mujer")} className="text-black hover:text-gray-600 transition">
              Mujer
            </button>
            <button onClick={() => setCategoriaFiltro("ninos")} className="text-black hover:text-gray-600 transition">
              Niños
            </button>
            <button onClick={() => setCategoriaFiltro("deporte")} className="text-black hover:text-gray-600 transition">
              Deporte
            </button>
            <button onClick={() => changePage("productos")} className="text-red-600 hover:text-red-700 transition">
              Descuentos
            </button>
          </nav>
        </div>
      </header>

      {/* Filtros (opcional, ya están en nav) — lo dejamos simple */}
      <div className="container mx-auto px-6 py-6">
        {loading ? (
          <p className="text-center py-10 text-gray-600">Cargando productos...</p>
        ) : error ? (
          <p className="text-center py-10 text-red-600">{error}</p>
        ) : productos.length === 0 ? (
          <p className="text-center py-10 text-gray-500">No hay productos en esta categoría</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
              >
                <div className="h-64 overflow-hidden cursor-pointer">
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

                  {/* Botón "Agregar al carrito" */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(producto);
                    }}
                    className="mt-3 w-full py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition"
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}