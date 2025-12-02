"use client"

interface HomeProps {
  changePage: (page: string) => void
}

export default function Home({ changePage }: HomeProps) {
  const sneakerBrands = [
    {
      name: "Nike",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Adidas",
      image:
        "https://images.unsplash.com/photo-1584735175097-24340fbad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "New Balance",
      image:
        "https://images.unsplash.com/photo-1597671197128-a36ef2d04e60?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Balenciaga",
      image:
        "https://images.unsplash.com/photo-1595777712821-2d48dad0ee75?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "AMIRI",
      image:
        "https://images.unsplash.com/photo-1518611505868-48510c2e022b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "BAPESTA",
      image:
        "https://images.unsplash.com/photo-1521881297894-dc64ac6d4c51?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "DC",
      image: "https://images.unsplash.com/photo-1542614049-c94d6fe6f89d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ]

  const featuredProducts = [
    {
      name: "Nike Killshot 2 Leather",
      category: "Calzado para hombre",
      colors: "1 color",
      price: "$395.970",
      originalPrice: "$659.950",
      discount: "40%",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Nike Air Max Dn",
      category: "Calzado para hombre",
      colors: "2 colores",
      price: "$593.970",
      originalPrice: "$989.950",
      discount: "40%",
      image:
        "https://images.unsplash.com/photo-1560072810562-40b06b21d228?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Nike Air Pegasus 2005",
      category: "Calzado para mujer",
      colors: "1 color",
      price: "$554.970",
      originalPrice: "$924.950",
      discount: "40%",
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          {/* Top bar with logo and search */}
          <div className="flex justify-between items-center py-4 mb-4">
            <div className="text-2xl font-black">Los Futbolitos</div>
            <div className="flex-1 mx-8 max-w-md">
              <input
                type="text"
                placeholder="Buscar"
                className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm placeholder-gray-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-6 items-center">
              <button className="text-gray-600 hover:text-black transition">🔍</button>
              <button className="text-gray-600 hover:text-black transition">🛒</button>
              <button
                onClick={() => changePage("login")}
                className="text-black font-semibold hover:text-gray-600 transition"
              >
                Iniciar sesión
              </button>
            </div>
          </div>

          <nav className="flex gap-8 text-sm font-semibold border-t border-gray-200 pt-4">
            <a href="#" className="text-black hover:text-gray-600 transition">
              Novedades
            </a>
            <a href="#" className="text-black hover:text-gray-600 transition">
              Hombre
            </a>
            <a href="#" className="text-black hover:text-gray-600 transition">
              Mujer
            </a>
            <a href="#" className="text-black hover:text-gray-600 transition">
              Niños
            </a>
            <a href="#" className="text-black hover:text-gray-600 transition">
              Deporte
            </a>
            <a href="#" className="text-red-600 hover:text-red-700 transition">
              Descuentos
            </a>
          </nav>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-gray-50 to-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
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
                alt="Featured Sneaker"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-black mb-12">NUESTRAS MARCAS</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {sneakerBrands.map((brand, i) => (
              <div key={i} className="group cursor-pointer" onClick={() => changePage("productos")}>
                <div className="relative h-48 overflow-hidden rounded-lg bg-gray-100 mb-3">
                  <img
                    src={brand.image || "/placeholder.svg"}
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-sm font-semibold text-center group-hover:text-gray-600 transition">{brand.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-black mb-12">PRODUCTOS DESTACADOS</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, i) => (
              <div key={i} className="group cursor-pointer" onClick={() => changePage("productos")}>
                <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4 h-64">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
                <p className="text-sm text-gray-600 mb-1">{product.category}</p>
                <p className="text-sm text-gray-500 mb-4">{product.colors}</p>
                <div className="flex gap-2 items-center mb-2">
                  <span className="text-lg font-black">{product.price}</span>
                  <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                </div>
                <p className="text-sm font-bold text-green-600">{product.discount} de descuento</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
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
                  <a href="#" className="hover:text-black transition">
                    Hombre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition">
                    Mujer
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition">
                    Niños
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-black font-bold mb-4">Soporte</h5>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-black transition">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition">
                    Envíos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition">
                    Devoluciones
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-black font-bold mb-4">Legal</h5>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-black transition">
                    Términos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition">
                    Privacidad
                  </a>
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
  )
}
