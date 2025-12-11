// src/context/cart-context.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface CartItem {
  id: number;
  producto_id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  image: string;
  marca: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Omit<CartItem, "id">) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Omit<CartItem, "id">) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.producto_id === product.producto_id);
      if (existing) {
        return prev.map((item) =>
          item.producto_id === product.producto_id
            ? { ...item, cantidad: item.cantidad + product.cantidad }
            : item
        );
      } else {
        return [...prev, { ...product, id: Date.now() }];
      }
    });
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};