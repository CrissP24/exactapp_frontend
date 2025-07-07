import React, { useState } from "react";
import "../../css/MenuCss/EstiloVentas.css";

const VentasM = () => {
  const [invoiceNumber, setInvoiceNumber] = useState("00050");
  const [date, setDate] = useState("2024-09-13");
  const [client, setClient] = useState("");
  const [products, setProducts] = useState([]);
  const [categories] = useState([
    { nombre: "Categoría", items: "Items", color: "#ffb3c6" },
    { nombre: "Categoría", items: "Items", color: "#ffb3c6" },
    { nombre: "Categoría", items: "Items", color: "#ffb3c6" },
    { nombre: "Electronica", items: 3, color: "#b9fbc0" },
  ]);

  return (
    <div style={{ minHeight: '100vh', background: '#fff', padding: 0 }}>
      {/* Header avatar y datos */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '20px 30px 0 30px' }}>
        <div style={{ textAlign: 'right', marginRight: 30 }}>
          <div style={{ fontWeight: 600, color: '#6a1b9a', fontSize: 16 }}>Nombre del Negocio</div>
          <div style={{ color: '#6a1b9a', fontSize: 14 }}>Categoría del negocio</div>
        </div>
        <div style={{ background: '#f3e5f5', border: '2px solid #d8b4e2', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 6 }}>
          <span style={{ fontSize: 40 }}>👤</span>
        </div>
      </div>
      <div style={{ padding: 30 }}>
        <div style={{ display: 'flex', gap: 20, marginBottom: 0 }}>
          {/* Panel Agregar Nueva Venta */}
          <div style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 12, background: '#fff', padding: 20, minWidth: 280, maxWidth: 500 }}>
            <div style={{ fontWeight: 700, fontSize: 22, color: '#222', textAlign: 'center', marginBottom: 18, letterSpacing: 1, fontFamily: 'monospace' }}>Agregar Nueva Venta</div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#6a1b9a', fontWeight: 600, marginBottom: 4 }}>Número de factura</div>
                <input type="text" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} style={{ width: '100%', border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff', textAlign: 'center' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#6a1b9a', fontWeight: 600, marginBottom: 4 }}>Fecha</div>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff', textAlign: 'center' }} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <input type="text" placeholder="Nombre del Cliente" value={client} onChange={e => setClient(e.target.value)} style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 6, padding: 10, background: '#fff', fontSize: 16 }} />
              <button style={{ background: '#d33fff', color: '#fff', border: 'none', borderRadius: 8, fontSize: 28, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>＋</button>
            </div>
            <div style={{ borderTop: '2px solid #d33fff', marginTop: 10, paddingTop: 10 }}>
              <div style={{ fontStyle: 'italic', color: '#6a1b9a', fontWeight: 600, fontSize: 18, textAlign: 'center', marginBottom: 8 }}>Productos</div>
              <div style={{ minHeight: 80, maxHeight: 120, overflowY: 'auto', background: '#fff', borderRadius: 6, border: 'none', marginBottom: 10 }}>
                {/* Aquí iría la lista de productos seleccionados */}
              </div>
              <button style={{ width: '60%', background: '#d33fff', color: '#fff', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, padding: '10px 0', margin: '0 auto', letterSpacing: 1, display: 'block' }}>ENVIAR AL CARRITO 🛒</button>
            </div>
          </div>
          {/* Panel Categorías */}
          <div style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 12, background: '#fff', padding: 20, minWidth: 220, maxWidth: 400 }}>
            <div style={{ fontWeight: 700, fontSize: 22, color: '#222', textAlign: 'center', marginBottom: 18, letterSpacing: 1, fontFamily: 'monospace' }}>Categorías</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              {categories.map((cat, idx) => (
                <div key={idx} style={{ border: '2px solid #d33fff', borderRadius: 8, background: cat.color, color: '#6a1b9a', fontWeight: 700, fontSize: 16, padding: '10px 18px', minWidth: 100, textAlign: 'center', marginBottom: 4 }}>
                  {cat.nombre}<br /><span style={{ fontWeight: 400, fontSize: 15 }}>{cat.items}</span>
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