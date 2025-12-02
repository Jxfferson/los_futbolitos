"use client"

interface HeroProps {
  changePage: (page: string) => void
}

export default function Hero({ changePage }: HeroProps) {
  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-primary via-primary to-muted">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl">
          <div className="inline-block mb-6 px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-bold">
            NUEVA COLECCIÓN 2025
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-primary-foreground mb-6 leading-tight text-balance">
            MOVIMIENTO PURO
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-xl text-balance">
            Descubre las mejores marcas de sneakers del mundo. Autenticidad garantizada, entrega rápida y exclusivos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => changePage("productos")}
              className="px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full transition transform hover:scale-105"
            >
              Explorar Marcas
            </button>
            <button className="px-8 py-4 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 font-bold rounded-full transition">
              Ver Catálogo
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="absolute right-0 top-0 h-full w-1/2 hidden lg:flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Premium Sneakers"
          className="h-full object-cover opacity-80"
        />
      </div>
    </section>
  )
}
