// src/components/pages/Home.tsx
import { useState } from "react";
import { useAuth } from "../../context/auth-provider"; // Importa el contexto de autenticación

interface HomeProps {
  changePage: (page: string) => void;
}

export default function Home({ changePage }: HomeProps) {
  const { user, logout } = useAuth(); // Obtiene el usuario y la función de logout

  const sneakerBrands = [
    {
      name: "Nike",
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    },
    {
      name: "Adidas",
      image: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    },
    {
      name: "New Balance",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/New_Balance_logo.svg/330px-New_Balance_logo.svg.png",
    },
    {
      name: "Balenciaga",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Balenciaga_Logo.svg/960px-Balenciaga_Logo.svg.png",
    },
    {
      name: "AMIRI",
      image: "https://images.seeklogo.com/logo-png/50/1/amiri-logo-png_seeklogo-501618.png",
    },
    {
      name: "BAPESTA",
      image: "https://www.freelogovectors.net/wp-content/uploads/2022/06/bape_logo-freelogovectors.net_-400x318.png",
    },
    {
      name: "DC",
      image: "https://vectorseek.com/wp-content/uploads/2021/02/DC-Shoes-Logo-Vector-scaled.jpg",
    },
    {
      name: "Puma",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Puma-logo-%28text%29.svg/960px-Puma-logo-%28text%29.svg.png",
    },
    {
      name: "Vans",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Vans_%28brand%29_logo.svg/960px-Vans_%28brand%29_logo.svg.png",
    },
    {
      name: "Converse",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Converse_Logo.svg",
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Nike Killshot 2 Leather",
      category: "Calzado para hombre",
      colors: "1 color",
      price: "$395.970",
      originalPrice: "$659.950",
      discount: "40%",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      name: "Nike Air Max Plus 'Light Orewood Brown'",
      category: "Calzado para hombre",
      colors: "2 colores",
      price: "$869.990",
      originalPrice: "$1,039,950",
      discount: "15%",
      image: "https://www.brokenchains.com.co/cdn/shop/files/DM0032-106-nike-tn-air-max-plus-light-orewood-brown-derecha-1.jpg?v=1757571457&width=1200",
    },
    {
      id: 3,
      name: "Adidas Samba OG",
      category: "Calzado para hombre",
      colors: "1 color",
      price: "$429.990",
      originalPrice: "$599.990",
      discount: "28%",
      image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/3bbecbdf584e40398446a8bf0117cf62_9366/Tenis_Samba_OG_Blanco_B75806_01_00_standard.jpg",
    },
    {
      id: 4,
      name: "New Balance 550 White Green",
      category: "Calzado para hombre",
      colors: "1 color",
      price: "$489.990",
      originalPrice: "$649.990",
      discount: "25%",
      image: "https://assets.solesense.com/en/images/products/500/new-balance-550-white-vintage-teal-bb550sta_1.jpg",
    },
    {
      id: 9,
      name: "Nike Air Force 1 Shadow",
      category: "Calzado para mujer",
      colors: "1 color",
      price: "$554.970",
      originalPrice: "$879.950",
      discount: "30%",
      image: "https://nikeco.vtexassets.com/arquivos/ids/536425-800-auto?v=638463882115170000&width=800&height=auto&aspect=true",
    },
    {
      id: 10,
      name: "Adidas Stan Smith",
      category: "Calzado para mujer",
      colors: "2 colores",
      price: "$389.990",
      originalPrice: "$549.990",
      discount: "29%",
      image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/69721f2e7c934d909168a80e00818569_9366/Tenis_Stan_Smith_UNISEX_Blanco_M20324_01_standard.jpg",
    },
    {
      id: 17,
      name: "Nike Star Runner 3",
      category: "Calzado para niños",
      colors: "2 colores",
      price: "$249.990",
      originalPrice: "$329.990",
      discount: "24%",
      image: "https://tiendaspls.com/wp-content/uploads/2023/09/da2776-001_1.jpg",
    },
    {
      id: 18,
      name: "Adidas Superstar Foundation",
      category: "Calzado para niños",
      colors: "1 color",
      price: "$219.990",
      originalPrice: "$299.990",
      discount: "27%",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpinUbcK0kFRHneC4DMheDkTEa1ijGMmOJGg&s",
    },
    {
      id: 25,
      name: "Nike ZoomX Invincible Run 3",
      category: "Calzado deportivo",
      colors: "1 color",
      price: "$899.990",
      originalPrice: "$1,199,990",
      discount: "25%",
      image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c8a2e8d-2b1e-4d1d-a4e7-f5b35d57d1e0/zoomx-invincible-run-3-zapatillas-de-running-para-hombre-lKjJhD.png",
    },
    {
      id: 26,
      name: "Adidas Ultraboost 23",
      category: "Calzado deportivo",
      colors: "2 colores",
      price: "$849.990",
      originalPrice: "$1,099,990",
      discount: "23%",
      image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/9e3d6b5e9fa14f44a0b4af52015d5e3f_9366/Ultraboost_23_Zapatillas_Blancas_GX7332_01_standard.jpg",
    },
  ];

  const categories = [
    { id: "hombre", title: "Calzado para Hombre", label: "Calzado para hombre" },
    { id: "mujer", title: "Calzado para Mujer", label: "Calzado para mujer" },
    { id: "ninos", title: "Calzado para Niños", label: "Calzado para niños" },
    { id: "deporte", title: "Calzado Deportivo", label: "Calzado deportivo" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const next = () => {
    if (currentIndex < sneakerBrands.length - itemsPerPage) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // 👇 Función para manejar el cierre de sesión
  const handleLogout = () => {
    logout(); // Limpia el estado y localStorage
    changePage("login"); // Cambia a la página de login
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-4 mb-4">
            <div className="text-2xl font-black">Los Futbolitos</div>
            <div className="flex-1 mx-8 max-w-md">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm placeholder-gray-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-6 items-center">
              <button className="text-gray-600 hover:text-black transition">🔍</button>
              <button className="text-gray-600 hover:text-black transition">🛒</button>
              {/* 👇 Botón dinámico: muestra nombre o "Iniciar sesión" */}
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">Hola, {user.nombre}</span>
                  <button
                    onClick={handleLogout} // ← Al hacer clic, cierra sesión y va al login
                    className="text-black font-semibold hover:text-gray-600 transition text-sm"
                  >
                    Cerrar sesión
                  </button>
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

          <nav className="flex gap-8 text-sm font-semibold border-t border-gray-200 pt-4">
            <button onClick={() => changePage("home")} className="text-black hover:text-gray-600 transition">
              Novedades
            </button>
            <button onClick={() => changePage("productos")} className="text-black hover:text-gray-600 transition">
              Hombre
            </button>
            <button onClick={() => changePage("productos")} className="text-black hover:text-gray-600 transition">
              Mujer
            </button>
            <button onClick={() => changePage("productos")} className="text-black hover:text-gray-600 transition">
              Niños
            </button>
            <button onClick={() => changePage("productos")} className="text-black hover:text-gray-600 transition">
              Deporte
            </button>
            <button onClick={() => changePage("productos")} className="text-red-600 hover:text-red-700 transition">
              Descuentos
            </button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                ZAPATILLAS
                <br />
                ORIGINALES
              </h2>
              <p className="text-xl text-gray-600 mb-8 font-light">
                Calidad premium, diseños exclusivos y entrega rápida a toda Colombia.
              </p>
              <button
                onClick={() => changePage("productos")}
                className="px-8 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition transform hover:scale-105"
              >
                Explorar Colección
              </button>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="Zapatilla destacada"
                className="max-w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MARCAS - CARRUSEL HORIZONTAL */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-4xl font-black">NUESTRAS MARCAS</h3>
            <div className="flex gap-2">
              <button
                onClick={prev}
                disabled={currentIndex === 0}
                className="p-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 transition"
              >
                ❮
              </button>
              <button
                onClick={next}
                disabled={currentIndex >= sneakerBrands.length - itemsPerPage}
                className="p-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 transition"
              >
                ❯
              </button>
            </div>
          </div>

          <div className="overflow-x-hidden">
            <div
              className="flex gap-6 transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            >
              {sneakerBrands.map((brand, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[calc(100%/4)] group cursor-pointer text-center"
                  onClick={() => changePage("productos")}
                >
                  <div className="relative h-40 overflow-hidden rounded-xl bg-gray-100 mb-3 flex items-center justify-center">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="max-w-[80%] max-h-[80%] object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-sm font-semibold group-hover:text-gray-700 transition">
                    {brand.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECCIONES POR CATEGORÍA */}
      {categories.map((cat) => (
        <section key={cat.id} className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-3xl md:text-4xl font-black">{cat.title}</h3>
              <button
                onClick={() => changePage("productos")}
                className="text-sm font-semibold text-black hover:text-gray-700"
              >
                Ver todos →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts
                .filter((p) => p.category === cat.label)
                .slice(0, 4)
                .map((product) => (
                  <div
                    key={product.id}
                    className="group cursor-pointer bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
                    onClick={() => changePage("productos")}
                  >
                    <div className="h-64 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-semibold mb-1">{product.name}</h4>
                      <p className="text-sm text-gray-600 mb-1">{product.category}</p>
                      <p className="text-sm text-gray-500 mb-2">{product.colors}</p>
                      <div className="flex gap-2 items-center">
                        <span className="text-lg font-black">{product.price}</span>
                        <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                      </div>
                      <p className="text-sm font-bold text-green-600 mt-1">{product.discount} de descuento</p>
                    </div>
                  </div>
                ))}

              {featuredProducts.filter((p) => p.category === cat.label).length === 0 && (
                <div className="col-span-full text-center py-10 text-gray-500">
                  Próximamente en {cat.title.toLowerCase()}
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* FOOTER */}
      <footer className="bg-gray-100 text-gray-700 py-12 border-t border-gray-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="text-black font-bold mb-4">Sobre Nosotros</h5>
              <p className="text-sm">Los mejores sneakers originales al mejor precio en Colombia.</p>
            </div>
            <div>
              <h5 className="text-black font-bold mb-4">Categorías</h5>
              <ul className="text-sm space-y-2">
                <li>
                  <button onClick={() => changePage("productos")} className="hover:text-black transition">
                    Hombre
                  </button>
                </li>
                <li>
                  <button onClick={() => changePage("productos")} className="hover:text-black transition">
                    Mujer
                  </button>
                </li>
                <li>
                  <button onClick={() => changePage("productos")} className="hover:text-black transition">
                    Niños
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-black font-bold mb-4">Soporte</h5>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="mailto:contacto@losfutbolitos.com" className="hover:text-black transition">
                    Contacto
                  </a>
                </li>
                <li>
                  <button onClick={() => changePage("productos")} className="hover:text-black transition">
                    Envíos
                  </button>
                </li>
                <li>
                  <button onClick={() => changePage("productos")} className="hover:text-black transition">
                    Devoluciones
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-black font-bold mb-4">Legal</h5>
              <ul className="text-sm space-y-2">
                <li>
                  <button onClick={() => changePage("productos")} className="hover:text-black transition">
                    Términos
                  </button>
                </li>
                <li>
                  <button onClick={() => changePage("productos")} className="hover:text-black transition">
                    Privacidad
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-8 text-center">
            <p>&copy; 2025 Los Futbolitos. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}