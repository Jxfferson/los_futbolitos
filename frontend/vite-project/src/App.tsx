// src/App.tsx
import { useState } from "react";
import { AuthProvider } from "./context/auth-provider";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Productos from "./components/pages/Productos";
import AdminDashboard from "./components/pages/AdminDashboard";
import EmpleadoDashboard from "./components/pages/EmpleadoDashboard";

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
    </AuthProvider>
  );
}