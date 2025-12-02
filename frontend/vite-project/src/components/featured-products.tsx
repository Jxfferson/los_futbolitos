"use client"

const featuredProducts = [
  {
    title: "Nike Air Max",
    category: "Zapatillas para hombre",
    price: "$189.99",
    originalPrice: "$249.99",
    discount: "24%",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Adidas Ultraboost",
    category: "Zapatillas para mujer",
    price: "$159.99",
    originalPrice: "$229.99",
    discount: "30%",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Balenciaga Speed",
    category: "Zapatillas premium",
    price: "$499.99",
    originalPrice: "$699.99",
    discount: "29%",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "New Balance 990v6",
    category: "Zapatillas clásicas",
    price: "$179.99",
    originalPrice: "$239.99",
    discount: "25%",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-foreground mb-4">LOS MÁS DESEADOS</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">Productos destacados con descuentos exclusivos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.title} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4 h-72 bg-muted">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                  -{product.discount}
                </div>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-accent transition">
                {product.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{product.category}</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-black text-foreground">{product.price}</span>
                <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
              </div>
              <button className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition">
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
