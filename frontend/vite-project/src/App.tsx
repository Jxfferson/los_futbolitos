// src/App.tsx
import { useState } from "react";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Productos from "./components/pages/Productos";
import AdminDashboard from "./components/pages/AdminDashboard";
import EmpleadoDashboard from "./components/pages/EmpleadoDashboard";

export default function App() {
  const [page, setPage] = useState<string>("home");

  return (
    <>
      {page === "home" && <Home changePage={setPage} />}
      {page === "login" && <Login changePage={setPage} />}
      {page === "productos" && <Productos changePage={setPage} />}
      {page === "admin" && <AdminDashboard changePage={setPage} />}
      {page === "empleado" && <EmpleadoDashboard changePage={setPage} />}
    </>
  );
}
