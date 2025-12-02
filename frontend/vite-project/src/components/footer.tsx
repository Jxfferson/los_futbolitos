export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h4 className="font-black text-lg mb-4">SNEAKER HUB</h4>
            <p className="text-sm text-primary-foreground/70">
              Tu destino premium para sneakers auténticos y exclusivos
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-4">Comprar</h5>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li className="hover:text-accent transition cursor-pointer">Todas las marcas</li>
              <li className="hover:text-accent transition cursor-pointer">Descuentos</li>
              <li className="hover:text-accent transition cursor-pointer">Nuevos</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4">Ayuda</h5>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li className="hover:text-accent transition cursor-pointer">Contacto</li>
              <li className="hover:text-accent transition cursor-pointer">Envíos</li>
              <li className="hover:text-accent transition cursor-pointer">Devoluciones</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4">Legal</h5>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li className="hover:text-accent transition cursor-pointer">Términos</li>
              <li className="hover:text-accent transition cursor-pointer">Privacidad</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/70">
          <p>&copy; 2025 Sneaker Hub. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
