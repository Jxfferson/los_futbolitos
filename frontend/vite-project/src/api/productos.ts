// src/api/productos.ts
const API_BASE = "http://localhost:3000";

export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  colors: string;
  price: string; // ya viene formateado como "$395.970"
  originalPrice: string;
  discount: string;
  image: string;
}

export const fetchProductos = async (categoria?: string): Promise<Producto[]> => {
  const url = new URL(`${API_BASE}/api/productos`);
  if (categoria) {
    url.searchParams.append("categoria", categoria);
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al cargar los productos");
  return res.json();
};