"use client"

interface HeaderProps {
  changePage: (page: string) => void
}

export default function Header({ changePage }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-2xl font-black tracking-tight text-foreground">SNEAKER</div>
          <span className="text-accent font-bold">HUB</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <button className="text-foreground hover:text-accent transition">Novedades</button>
          <button className="text-foreground hover:text-accent transition">Colecciones</button>
          <button className="text-foreground hover:text-accent transition">Descuentos</button>
        </nav>

        {/* Auth Button */}
        <button
          onClick={() => changePage("login")}
          className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-full hover:opacity-90 transition transform hover:scale-105"
        >
          Entrar
        </button>
      </div>
    </header>
  )
}
