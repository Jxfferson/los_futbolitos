import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Productos from "./pages/Productos";
import AdminDashboard from "./pages/AdminDashboard";
import EmpleadoDashboard from "./pages/EmpleadoDashboard";

export default function App() {
  const [page, setPage] = useState<string>("home");

  return (
    <>
      <header className="header">LOS FUTBOLITOS – Sistema de Inventario</header>

      {page === "home" && <Home changePage={setPage} />}
      {page === "login" && <Login changePage={setPage} />}
      {page === "productos" && <Productos changePage={setPage} />}
      {page === "admin" && <AdminDashboard changePage={setPage} />}
      {page === "empleado" && <EmpleadoDashboard changePage={setPage} />}
    </>
  );
}
