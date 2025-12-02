"use client"

interface BrandShowcaseProps {
  changePage: (page: string) => void
}

const brands = [
  {
    name: "Nike",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Adidas",
    image:
      "https://images.unsplash.com/photo-1570143031998-ba1c9b1f9a09?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "New Balance",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Balenciaga",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "AMIRI",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "BAPESTA",
    image: "https://images.unsplash.com/photo-1561672336-c3fee3c55d95?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "DC",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
]

export default function BrandShowcase({ changePage }: BrandShowcaseProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-foreground mb-4">MARCAS PREMIUM</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Las mejores colecciones de sneakers de marcas reconocidas mundialmente
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brands.slice(0, 6).map((brand) => (
            <div key={brand.name} onClick={() => changePage("productos")} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4 h-64 bg-muted">
                <img
                  src={brand.image || "/placeholder.svg"}
                  alt={brand.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="text-primary-foreground font-bold text-sm">Ver Colección</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition">{brand.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
