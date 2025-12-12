// frontend/vite-project/src/components/pages/Perfil.tsx
import { useState } from "react";
import { useAuth } from "../../context/auth-provider";

interface ZapatoSubido {
  id: number;
  nombre: string;
  marca: string;
  precio: string;
  genero: string;
  temporada: string;
  imagen: string;
  descripcion: string;
  estado: "pendiente" | "aprobado" | "rechazado";
}

interface PerfilProps {
  changePage: (page: string) => void;
}

export default function Perfil({ changePage }: PerfilProps) {
  const { user, logout } = useAuth();

  // Estado del perfil
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [nombre, setNombre] = useState(user?.nombre || "");
  const email = user?.email || "";

  // Estado del panel (zapatos subidos)
  const [zapatosSubidos, setZapatosSubidos] = useState<ZapatoSubido[]>(() => {
    const saved = localStorage.getItem(`zapatos_usuario_${user?.id}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [mensaje, setMensaje] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Estado de navegación dentro del perfil
  const [activeTab, setActiveTab] = useState<"perfil" | "panel">("perfil");

  // Guardar cambios de perfil
  const handleGuardarPerfil = () => {
    if (!user) return;
    const updatedUser = { ...user, nombre, avatar };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setMensaje({ type: "success", text: "Perfil actualizado con éxito." });
    setTimeout(() => setMensaje(null), 3000);
  };

  // Subir nuevo zapato
  const handleSubirZapato = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.rol !== "admin") {
      setMensaje({ type: "error", text: "Solo los administradores pueden subir zapatos." });
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    const nombre = (formData.get("nombre") as string).trim();
    const marca_id = 1; // Fijo: Nike
    const precioRaw = (formData.get("precio") as string).replace(/\D/g, "");
    const precio = precioRaw ? parseInt(precioRaw) : 0;
    const genero = formData.get("genero") as string;
    const temporada = formData.get("temporada") as string;
    const imagen_url = (formData.get("imagen") as string).trim();
    const descripcion = (formData.get("descripcion") as string).trim();

    if (!nombre || !precio || !imagen_url) {
      setMensaje({ type: "error", text: "Completa al menos nombre, precio e imagen." });
      return;
    }

    const zapatoData = {
      nombre,
      marca_id,
      precio,
      genero,
      temporada,
      descripcion,
      imagen_url,
      usuario_id: user.id,
    };

    try {
      const res = await fetch("http://localhost:3000/api/zapatos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(zapatoData),
      });

      const result = await res.json();

      if (!res.ok) {
        setMensaje({ type: "error", text: result.message || "Error al subir zapato" });
        return;
      }

      const nuevoZapato: ZapatoSubido = {
        id: Date.now(),
        nombre,
        marca: "Nike",
        precio: `$${precio.toLocaleString("es-CO")}`,
        genero,
        temporada,
        imagen: imagen_url,
        descripcion,
        estado: "pendiente",
      };

      const updated = [nuevoZapato, ...zapatosSubidos];
      setZapatosSubidos(updated);
      localStorage.setItem(`zapatos_usuario_${user.id}`, JSON.stringify(updated));

      setMensaje({ type: "success", text: "¡Zapato enviado para revisión!" });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setMensaje({ type: "error", text: "Error de red. Verifica que el backend esté corriendo." });
    }
  };

  const handleLogout = () => {
    logout();
    changePage("login");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => changePage("home")}
            className="text-black font-bold hover:text-gray-700 transition flex items-center gap-2"
          >
            ← Volver al inicio
          </button>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:underline"
          >
            Cerrar sesión
          </button>
        </div>

        {mensaje && (
          <div className={`mb-6 p-4 rounded ${mensaje.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {mensaje.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Menú lateral */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-6">Configuración</h2>
            <div className="space-y-4">
              <button
                onClick={() => setActiveTab("perfil")}
                className={`w-full text-left px-4 py-2 rounded transition ${
                  activeTab === "perfil"
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 inline"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14a4 4 0 014-4h4M12 14a4 4 0 01-4-4h-4m4 4v8m4-8v8" />
                </svg>
                Mi perfil
              </button>
              <button
                onClick={() => setActiveTab("panel")}
                className={`w-full text-left px-4 py-2 rounded transition ${
                  activeTab === "panel"
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 inline"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10v6m6-2a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
                Panel
              </button>
              <button
                onClick={() => changePage("carrito")}
                className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 inline"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10v8a2 2 0 002 2H5a2 2 0 002-2v-8m7-1a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Mi carrito
              </button>
              <hr className="my-4 border-gray-200" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 inline"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 6v-6" />
                </svg>
                Cerrar sesión
              </button>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow">
            {activeTab === "perfil" && (
              <>
                <h2 className="text-xl font-bold mb-4">Información personal</h2>
                <div className="flex flex-col items-center mb-6">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Avatar"
                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 mb-4"
                      onError={() => setAvatar("")}
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                      <span className="text-gray-500 text-2xl">👤</span>
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="URL del avatar (opcional)"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    className="w-full text-sm px-3 py-2 border rounded"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nombre</label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full px-3 py-2 border rounded bg-gray-100"
                    />
                  </div>
                  <button
                    onClick={handleGuardarPerfil}
                    className="w-full mt-4 bg-black text-white py-2 rounded font-bold hover:bg-gray-800 transition"
                  >
                    Guardar cambios
                  </button>
                </div>
              </>
            )}

            {activeTab === "panel" && (
              <>
                <h2 className="text-xl font-bold mb-4">Panel de Administración</h2>
                {user?.rol === "admin" ? (
                  <>
                    <p className="text-gray-600 mb-6">
                      Aquí puedes ver tus zapatos subidos y agregar nuevos.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Formulario de subida */}
                      <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-bold mb-4">Sube un zapato para vender</h3>
                        <form onSubmit={handleSubirZapato} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Nombre del zapato</label>
                            <input
                              name="nombre"
                              type="text"
                              placeholder="Ej: Nike Air Force 1 'White'"
                              className="w-full px-3 py-2 border rounded"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Marca (ID)</label>
                            <input
                              name="marca"
                              type="text"
                              value="1 (Nike)"
                              readOnly
                              className="w-full px-3 py-2 border rounded bg-gray-100"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Precio (COP)</label>
                              <input
                                name="precio"
                                type="text"
                                placeholder="395970"
                                onChange={(e) => {
                                  e.target.value = e.target.value.replace(/\D/g, "");
                                }}
                                className="w-full px-3 py-2 border rounded"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Género</label>
                              <select name="genero" className="w-full px-3 py-2 border rounded">
                                <option value="hombre">Hombre</option>
                                <option value="mujer">Mujer</option>
                                <option value="niño">Niño</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Tipo</label>
                            <select name="temporada" className="w-full px-3 py-2 border rounded">
                              <option value="casual">Casual</option>
                              <option value="deporte">Deporte</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">URL de la imagen</label>
                            <input
                              name="imagen"
                              type="url"
                              placeholder="https://ejemplo.com/zapato.jpg"
                              className="w-full px-3 py-2 border rounded"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Descripción (opcional)</label>
                            <textarea
                              name="descripcion"
                              className="w-full px-3 py-2 border rounded"
                              rows={3}
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700 transition"
                          >
                            Enviar zapato para revisión
                          </button>
                        </form>
                      </div>

                      {/* Lista de zapatos subidos */}
                      <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-bold mb-4">Tus zapatos en venta</h3>
                        {zapatosSubidos.length === 0 ? (
                          <p className="text-sm text-gray-500">Aún no has subido zapatos.</p>
                        ) : (
                          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                            {zapatosSubidos.map((zapato) => (
                              <div key={zapato.id} className="flex gap-2">
                                <img
                                  src={zapato.imagen}
                                  alt={zapato.nombre}
                                  className="w-10 h-10 object-cover rounded"
                                  onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/40")}
                                />
                                <div className="text-xs">
                                  <p className="font-medium">{zapato.nombre}</p>
                                  <p className="text-gray-500">{zapato.precio}</p>
                                  <span
                                    className={`inline-block px-2 py-1 rounded-full text-[10px] mt-1 ${
                                      zapato.estado === "aprobado"
                                        ? "bg-green-100 text-green-800"
                                        : zapato.estado === "rechazado"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {zapato.estado}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-600">
                      Solo los administradores pueden acceder a este panel.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}