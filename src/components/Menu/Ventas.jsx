import React, { useState, useEffect } from "react";
import "../../css/MenuCss/EstiloVentas.css";

const VentasM = ({ onGoToCompras }) => {
  const [invoiceNumber, setInvoiceNumber] = useState("00050");
  const [date, setDate] = useState("2024-09-13");
  const [client, setClient] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([
    { id: "1", name: "Producto Ejemplo 1", price: 10 },
    { id: "2", name: "Producto Ejemplo 2", price: 15 },
    { id: "3", name: "Leche", price: 5 },
    { id: "4", name: "Pan", price: 3 },
    { id: "5", name: "Queso", price: 8 },
    { id: "6", name: "Jugo de Naranja", price: 6 },
    { id: "7", name: "Cereal", price: 7 },
    { id: "8", name: "Galletas", price: 4 },
    { id: "9", name: "Refresco", price: 5 },
    { id: "10", name: "Arroz", price: 3 },
    { id: "11", name: "Azúcar", price: 2 },
    { id: "12", name: "Café", price: 9 },
    { id: "13", name: "Té", price: 6 },
    { id: "14", name: "Pollo", price: 12 },
    { id: "15", name: "Carne de Res", price: 15 },
    { id: "16", name: "Pasta", price: 4 },
    { id: "17", name: "Aceite", price: 7 },
    { id: "18", name: "Huevos", price: 5 },
    { id: "19", name: "Mantequilla", price: 6 },
    { id: "20", name: "Yogur", price: 5 },
  ]);

  useEffect(() => {
    // Datos de ejemplo para categorías
    const categoriasEjemplo = [
      { id: "1", nombre: "Electrónica", variaciones: ["Laptop", "Celular"], color: "#b2f7b8" },
      { id: "2", nombre: "Ropa", variaciones: ["Camisa", "Pantalón"], color: "#b2f7e6" },
      { id: "3", nombre: "Alimentos", variaciones: ["Pan"], color: "#b2e0f7" },
      { id: "4", nombre: "Bebidas", variaciones: ["Refresco"], color: "#d3b2f7" },
      { id: "5", nombre: "Papelería", variaciones: [], color: "#f7eeb2" },
    ];
    localStorage.setItem("appData", JSON.stringify({ categorias: categoriasEjemplo }));
    const appData = JSON.parse(localStorage.getItem("appData")) || { categorias: [] };
    const storedVentasData = JSON.parse(localStorage.getItem("ventasData")) || {
      invoiceNumber: "00050",
      date: "2024-09-13",
      client: "",
      products: [],
    };
    setInvoiceNumber(storedVentasData.invoiceNumber);
    setDate(storedVentasData.date);
    setClient(storedVentasData.client);
    setProducts(storedVentasData.products);
    setCategories(appData.categorias);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "ventasData",
      JSON.stringify({
        invoiceNumber,
        date,
        client,
        products,
      })
    );
  }, [invoiceNumber, date, client, products]);

  const handleAddProduct = (e) => {
    const selectedProduct = availableProducts.find(p => p.id === e.target.value);
    if (selectedProduct) {
      setProducts([
        ...products,
        {
          id: Date.now().toString(),
          nombre: selectedProduct.name,
          cantidad: 1,
          precio: selectedProduct.price,
        },
      ]);
    }
  };

  const handleEnviarAlCarrito = () => {
    if (!client || products.length === 0) {
      alert("Completa todos los campos y agrega al menos un producto.");
      return;
    }
    const venta = {
      invoiceNumber,
      date,
      client,
      products,
    };
    const ventas = JSON.parse(localStorage.getItem("ventas")) || [];
    ventas.push(venta);
    localStorage.setItem("ventas", JSON.stringify(ventas));
    setInvoiceNumber("");
    setDate("");
    setClient("");
    setProducts([]);
    if (typeof onGoToCompras === 'function') {
      onGoToCompras();
    } else {
      alert("Venta enviada al carrito. Ve a la sección de Compras para continuar.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff", padding: 0 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "20px 30px 0 30px",
        }}
      >
        <div style={{ textAlign: "right", marginRight: 30 }}>
          <div
            style={{ fontWeight: 600, color: "#6a1b9a", fontSize: 16 }}
          >
            Nombre del Negocio
          </div>
          <div style={{ color: "#6a1b9a", fontSize: 14 }}>
            Categoría del negocio
          </div>
        </div>
        <div
          style={{
            background: "#f3e5f5",
            border: "2px solid #d8b4e2",
            borderRadius: "50%",
            width: 60,
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 6,
          }}
        >
          <span style={{ fontSize: 40 }}>👤</span>
        </div>
      </div>
      <div style={{ padding: 30 }}>
        <div style={{ display: "flex", gap: 20, marginBottom: 0 }}>
          <div
            style={{
              flex: 1,
              border: "2px solid #d33fff",
              borderRadius: 12,
              background: "#fff",
              padding: 20,
              minWidth: 280,
              maxWidth: 500,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 22,
                color: "#222",
                textAlign: "center",
                marginBottom: 18,
                letterSpacing: 1,
                fontFamily: "monospace",
              }}
            >
              Agregar Nueva Venta
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: "#6a1b9a",
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  Número de factura
                </div>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  style={{
                    width: "100%",
                    border: "2px solid #d33fff",
                    borderRadius: 6,
                    padding: 8,
                    background: "#fff",
                    textAlign: "center",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: "#6a1b9a",
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  Fecha
                </div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{
                    width: "100%",
                    border: "2px solid #d33fff",
                    borderRadius: 6,
                    padding: 8,
                    background: "#fff",
                    textAlign: "center",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 18,
              }}
            >
              <input
                type="text"
                placeholder="Nombre del Cliente"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                style={{
                  flex: 1,
                  border: "2px solid #d33fff",
                  borderRadius: 6,
                  padding: 10,
                  background: "#fff",
                  fontSize: 16,
                }}
              />
              <select
                onChange={handleAddProduct}
                style={{
                  background: "#d33fff",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 16,
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                <option value="">+</option>
                {availableProducts.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {prod.name}
                  </option>
                ))}
              </select>
            </div>
            <div
              style={{
                borderTop: "2px solid #d33fff",
                marginTop: 10,
                paddingTop: 10,
              }}
            >
              <div
                style={{
                  fontStyle: "italic",
                  color: "#6a1b9a",
                  fontWeight: 600,
                  fontSize: 18,
                  textAlign: "center",
                  marginBottom: 8,
                }}
              >
                Productos
              </div>
              <div
                style={{
                  minHeight: 80,
                  maxHeight: 120,
                  overflowY: "auto",
                  background: "#fff",
                  borderRadius: 6,
                  border: "none",
                  marginBottom: 10,
                }}
              >
                {products.map((product, idx) => (
                  <div
                    key={product.id || idx}
                    style={{
                      padding: 8,
                      borderBottom: "1px solid #d33fff",
                    }}
                  >
                    {product.nombre || "Producto sin nombre"} - Cantidad: {product.cantidad} - Precio: ${product.precio}
                  </div>
                ))}
              </div>
              <button
                style={{
                  width: "60%",
                  background: "#d33fff",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 16,
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 0",
                  margin: "0 auto",
                  letterSpacing: 1,
                  display: "block",
                }}
                onClick={handleEnviarAlCarrito}
              >
                ENVIAR AL CARRITO 🛒
              </button>
            </div>
          </div>
          <div
            style={{
              flex: 1,
              border: "2px solid #d33fff",
              borderRadius: 12,
              background: "url('https://example.com/wave-pattern.jpg') repeat",
              padding: 20,
              minWidth: 220,
              maxWidth: 400,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 22,
                color: "#222",
                textAlign: "center",
                marginBottom: 18,
                letterSpacing: 1,
                fontFamily: "monospace",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                padding: "5px 10px",
                borderRadius: "5px",
                display: "inline-block",
              }}
            >
              Categorías
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                justifyContent: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              {categories.map((cat, idx) => (
                <div
                  key={cat.id || idx}
                  style={{
                    border: "2px solid #d33fff",
                    borderRadius: 8,
                    background: cat.color || (idx % 2 === 0 ? "#a3e4d7" : "#f7d794"),
                    color: "#05445e",
                    fontWeight: 700,
                    fontSize: 16,
                    padding: "10px 18px",
                    minWidth: 100,
                    textAlign: "center",
                    marginBottom: 4,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {cat.nombre}
                  <br />
                  <span style={{ fontWeight: 400, fontSize: 15 }}>
                    {cat.variaciones && Array.isArray(cat.variaciones)
                      ? cat.variaciones.length
                      : 0} Items
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VentasM;