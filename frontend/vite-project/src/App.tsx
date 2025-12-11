// src/App.tsx
import { useState } from "react";
import { AuthProvider } from "./context/auth-provider";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Productos from "./components/pages/Productos";
import AdminDashboard from "./components/pages/AdminDashboard";
import EmpleadoDashboard from "./components/pages/EmpleadoDashboard";
import Carrito from "./components/pages/Carrito";
import SimulacionPago from "./components/pages/SimulacionPago"; // ← nuevo

export default function App() {
  const [page, setPage] = useState<string>("home");
  return (
    <AuthProvider>
      {page === "home" && <Home changePage={setPage} />}
      {page === "login" && <Login changePage={setPage} />}
      {page === "register" && <Register changePage={setPage} />}
      {page === "productos" && <Productos changePage={setPage} />}
      {page === "admin" && <AdminDashboard changePage={setPage} />}
      {page === "empleado" && <EmpleadoDashboard changePage={setPage} />}
      {page === "carrito" && <Carrito changePage={setPage} />}
      {page === "simulacion-pago" && <SimulacionPago changePage={setPage} />} {/* ← nuevo */}
    </AuthProvider>
  );
}