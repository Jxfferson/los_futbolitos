// src/App.tsx
import { useState } from "react";
import { AuthProvider } from "./context/auth-provider";
import { CartProvider } from "./context/cart-context"; // Asegúrate de tener esto si usas carrito
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Productos from "./components/pages/Productos";
import Perfil from "./components/pages/Perfil";
import Carrito from "./components/pages/Carrito";
import SimulacionPago from "./components/pages/SimulacionPago";
import ProductDetail from "./components/pages/ProductDetail"; // Asegúrate de que el archivo exista y se llame así

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  // Esta función se pasa a todas las páginas
  const changePage = (page: string, productId?: number) => {
    if (productId !== undefined) {
      setSelectedProductId(productId);
    }
    setCurrentPage(page);
  };

  return (
    <AuthProvider>
      <CartProvider>
        {currentPage === "home" && <Home changePage={changePage} />}
        {currentPage === "login" && <Login changePage={changePage} />}
        {currentPage === "register" && <Register changePage={changePage} />}
        {currentPage === "productos" && <Productos changePage={changePage} />}
        {currentPage === "carrito" && <Carrito changePage={changePage} />}
        {currentPage === "simulacion-pago" && <SimulacionPago changePage={changePage} />}
        {currentPage === "product-detail" && selectedProductId !== null && (
          <ProductDetail productId={selectedProductId} changePage={changePage} />
        )}
        {currentPage === "perfil" && <Perfil changePage={changePage} />}|
      </CartProvider>
    </AuthProvider>
  );
}