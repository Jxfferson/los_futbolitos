// src/pages/Home.tsx
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Los Futbolitos</h1>
          <div className="flex gap-4">
            <button onClick={() => navigate("/login")} className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
              Iniciar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-800"></div>
        <div className="relative z-10 container mx-auto px-6 pt-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-white mb-10 md:mb-0">
            <h2 className="text-5xl font-extrabold mb-4">ZAPATILLAS ORIGINALES</h2>
            <p className="text-xl mb-8">Calidad premium, diseños exclusivos y entrega rápida.</p>
            <button
              onClick={() => navigate("/productos")}
              className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition transform hover:scale-105"
            >
              Ver Productos
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              alt="Zapatillas Nike"
              className="rounded-lg shadow-2xl max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-10">Categorías</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Hombre", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
              { name: "Mujer", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
              { name: "Niño/a", image: "https://images.unsplash.com/photo-1586771779443-9e37995b1227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
              { name: "Deporte", image: "https://images.unsplash.com/photo-1542298060-656472735986?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" }
            ].map((cat, i) => (
              <div key={i} className="group cursor-pointer" onClick={() => navigate(`/productos?categoria=${cat.name}`)}>
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <img src={cat.image} alt={cat.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h4 className="mt-4 text-xl font-semibold text-center">{cat.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2025 Los Futbolitos. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}