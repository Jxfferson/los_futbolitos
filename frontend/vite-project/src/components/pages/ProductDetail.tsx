// src/components/pages/ProductDetail.tsx
import { useState, useEffect } from "react";
import { useCart } from "../../context/cart-context";
import { useAuth } from "../../context/auth-provider";

interface ProductDetailProps {
  productId: number;
  changePage: (page: string, productId?: number) => void;
}

const PRODUCT_CATALOG = [
  {
    id: 1,
    name: "Nike Killshot 2 Leather",
    category: "Calzado para hombre",
    colors: ["Blanco"],
    price: "$395.970",
    originalPrice: "$659.950",
    discount: "40%",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Zapatillas clásicas de cuero premium con suela de goma y diseño minimalista.",
    materials: "Cuero genuino, suela de goma",
    warranty: "30 días de garantía",
  },
  {
    id: 2,
    name: "Nike Air Max Plus 'Light Orewood Brown'",
    category: "Calzado para hombre",
    colors: ["Marrón", "Beige"],
    price: "$869.990",
    originalPrice: "$1,039,950",
    discount: "15%",
    image: "https://www.brokenchains.com.co/cdn/shop/files/DM0032-106-nike-tn-air-max-plus-light-orewood-brown-derecha-1.jpg?v=1757571457&width=1200",
    description: "Tecnología Air Max para máxima amortiguación. Diseño aerodinámico y cómodo.",
    materials: "Mesh transpirable, unidades Air Max",
    warranty: "60 días de garantía",
  },
  {
    id: 3,
    name: "Adidas Samba OG",
    category: "Calzado para hombre",
    colors: ["Blanco"],
    price: "$429.990",
    originalPrice: "$599.990",
    discount: "28%",
    image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/3bbecbdf584e40398446a8bf0117cf62_9366/Tenis_Samba_OG_Blanco_B75806_01_00_standard.jpg",
    description: "Un clásico desde los años 50. Estilo retro con suela de caucho.",
    materials: "Cuero suave, suela de caucho",
    warranty: "45 días de garantía",
  },
  {
    id: 9,
    name: "Nike Air Force 1 Shadow",
    category: "Calzado para mujer",
    colors: ["Blanco", "Rosa"],
    price: "$554.970",
    originalPrice: "$879.950",
    discount: "30%",
    image: "https://nikeco.vtexassets.com/arquivos/ids/536425-800-auto?v=638463882115170000&width=800&height=auto&aspect=true",
    description: "Diseño moderno con capas superpuestas para un look llamativo.",
    materials: "Cuero, malla, espuma",
    warranty: "30 días",
  },
  {
    id: 17,
    name: "Nike Star Runner 3",
    category: "Calzado para niños",
    colors: ["Negro", "Rojo"],
    price: "$249.990",
    originalPrice: "$329.990",
    discount: "24%",
    image: "https://tiendaspls.com/wp-content/uploads/2023/09/da2776-001_1.jpg",
    description: "Ligeras y duraderas, ideales para el día a día de los más pequeños.",
    materials: "Malla, suela de goma",
    warranty: "30 días",
  },
];

export default function ProductDetail({ productId, changePage }: ProductDetailProps) {
  const { addItem } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const found = PRODUCT_CATALOG.find(p => p.id === productId);
    if (found) {
      setProduct(found);
      setSelectedColor(found.colors[0]); // Selecciona el primer color por defecto
    } else {
      changePage("home");
    }
  }, [productId, changePage]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  const parsePrice = (priceStr: string): number => {
    return parseFloat(priceStr.replace(/[$.,]/g, "").replace(".", ""));
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor selecciona una talla.");
      return;
    }
    const cartItem = {
      producto_id: product.id,
      nombre: product.name,
      precio: parsePrice(product.price),
      cantidad: quantity,
      image: product.image,
      marca: product.name.split(" ")[0] || "Sin marca",
      color: selectedColor,
      talla: selectedSize,
    };
    addItem(cartItem);
    alert(`✅ ${product.name} agregado al carrito`);
    changePage("carrito");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Botón de volver */}
        <button
          onClick={() => changePage("home")}
          className="text-black font-semibold mb-6 flex items-center gap-2"
        >
          ← Volver a la tienda
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imagen */}
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full h-auto rounded-xl shadow-lg"
            />
          </div>

          {/* Detalles */}
          <div>
            <h1 className="text-3xl font-black mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.category}</p>
            <div className="flex gap-4 items-center mb-6">
              <span className="text-2xl font-black">{product.price}</span>
              <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
              <span className="text-sm font-bold text-green-600">{product.discount} de descuento</span>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-2">Descripción</h3>
              <p className="text-gray-700 text-sm">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="font-semibold text-sm">Materiales</h4>
                <p className="text-gray-600 text-sm">{product.materials}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Garantía</h4>
                <p className="text-gray-600 text-sm">{product.warranty}</p>
              </div>
            </div>

            {/* Color */}
            {product.colors.length > 1 && (
              <div className="mb-6">
                <label className="block font-semibold mb-2">Color</label>
                <div className="flex gap-2">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg ${selectedColor === color ? "bg-black text-white" : "bg-gray-100"}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Talla */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Talla (EUR)</label>
              <div className="grid grid-cols-5 gap-2">
                {[36,37,38,39,40,41,42,43,44,45].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(String(size))}
                    className={`py-2 border rounded-lg text-sm ${selectedSize === String(size) ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Cantidad */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Cantidad</label>
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 p-2 border border-gray-300 rounded"
              />
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}