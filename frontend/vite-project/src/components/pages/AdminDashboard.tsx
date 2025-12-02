"use client"

interface Props {
  changePage: (page: string) => void
}

export default function AdminDashboard({ changePage }: Props) {
  const handleLogout = () => {
    localStorage.removeItem("user")
    changePage("login")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Panel Administrativo</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-lg p-6 border border-border">
              <p className="text-muted-foreground text-sm mb-2">Ventas totales</p>
              <p className="text-4xl font-bold text-accent">$12,500</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <p className="text-muted-foreground text-sm mb-2">Órdenes</p>
              <p className="text-4xl font-bold text-foreground">156</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <p className="text-muted-foreground text-sm mb-2">Clientes</p>
              <p className="text-4xl font-bold text-foreground">89</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <p className="text-muted-foreground text-sm mb-2">Productos</p>
              <p className="text-4xl font-bold text-foreground">342</p>
            </div>
          </div>

          {/* Opciones del admin */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => changePage("productos")}
              className="p-8 bg-card border border-border rounded-lg hover:bg-secondary transition-colors text-left"
            >
              <h3 className="text-xl font-bold text-foreground mb-2">Gestión de productos</h3>
              <p className="text-muted-foreground">Ver y editar productos del inventario</p>
            </button>

            <button
              onClick={() => changePage("empleado-dashboard")}
              className="p-8 bg-card border border-border rounded-lg hover:bg-secondary transition-colors text-left"
            >
              <h3 className="text-xl font-bold text-foreground mb-2">Panel de empleado</h3>
              <p className="text-muted-foreground">Acceder al panel de gestión de órdenes</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
