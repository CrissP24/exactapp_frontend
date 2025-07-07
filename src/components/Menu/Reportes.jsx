import React from 'react';
import '../../css/MenuCss/EstiloReportes.css';

const MReportes = () => {
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
      {/* Main content */}
      <div style={{ padding: 30 }}>
        <h2 style={{ fontWeight: 700, fontSize: 22, color: '#222', marginBottom: 10 }}>Reportes</h2>
        {/* Gráfico simulado */}
        <div style={{ border: '1.5px solid #d33fff', borderRadius: 12, background: '#fff', padding: 20, marginBottom: 30 }}>
          <div style={{ width: '100%', height: 220, background: '#faf6ff', borderRadius: 8, marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
            {/* Simulación de gráfico */}
            <svg width="100%" height="220" style={{ position: 'absolute', left: 0, top: 0 }}>
              <polyline
                fill="none"
                stroke="#6a1b9a"
                strokeWidth="3"
                points="20,200 80,180 140,200 200,160 260,200 320,40 380,200"
              />
              <circle cx="320" cy="40" r="6" fill="#6a1b9a" />
              <text x="330" y="50" fontSize="13" fill="#6a1b9a">Ingresos</text>
            </svg>
            <div style={{ position: 'absolute', left: 40, top: 20, color: '#6a1b9a', fontWeight: 600, fontSize: 14, background: '#fff', border: '1px solid #d33fff', borderRadius: 6, padding: '2px 8px' }}>
              Mayo 1<br />Ingreso: $0.00
            </div>
          </div>
        </div>
        {/* Tarjetas resumen */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 30 }}>
          <div style={{ flex: 1, background: '#f8eaff', border: '2px solid #d33fff', borderRadius: 12, padding: 20, textAlign: 'center', fontWeight: 700, fontSize: 20 }}>
            Ingreso
            <div style={{ fontSize: 28, color: '#6a1b9a', marginTop: 10 }}>$</div>
          </div>
          <div style={{ flex: 1, background: '#f8eaff', border: '2px solid #d33fff', borderRadius: 12, padding: 20, textAlign: 'center', fontWeight: 700, fontSize: 20 }}>
            Ventas
            <div style={{ fontSize: 28, color: '#6a1b9a', marginTop: 10 }}>0</div>
          </div>
          <div style={{ flex: 1, background: '#f8eaff', border: '2px solid #d33fff', borderRadius: 12, padding: 20, textAlign: 'center', fontWeight: 700, fontSize: 20 }}>
            Ganancias
            <div style={{ fontSize: 28, color: '#6a1b9a', marginTop: 10 }}>0</div>
          </div>
        </div>
        {/* Tarjetas de mejores */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
          <div style={{ flex: 1, background: '#fff', border: '2px solid #d33fff', borderRadius: 12, padding: 16, minHeight: 90 }}>
            <div style={{ fontWeight: 600, color: '#222', marginBottom: 8 }}>Mejor empleado <span style={{ float: 'right', color: '#d33fff', fontWeight: 700, fontSize: 18 }}>☆</span></div>
          </div>
          <div style={{ flex: 1, background: '#fff', border: '2px solid #d33fff', borderRadius: 12, padding: 16, minHeight: 90 }}>
            <div style={{ fontWeight: 600, color: '#222', marginBottom: 8 }}>Mejor categoría <span style={{ float: 'right', color: '#d33fff', fontWeight: 700, fontSize: 18 }}>☆</span></div>
          </div>
          <div style={{ flex: 1, background: '#fff', border: '2px solid #d33fff', borderRadius: 12, padding: 16, minHeight: 90 }}>
            <div style={{ fontWeight: 600, color: '#222', marginBottom: 8 }}>Mejor producto <span style={{ float: 'right', color: '#d33fff', fontWeight: 700, fontSize: 18 }}>☆</span></div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1, background: '#fff', border: '2px solid #d33fff', borderRadius: 12, padding: 16, minHeight: 90 }}>
            <div style={{ fontWeight: 600, color: '#222', marginBottom: 8 }}>Mejor cliente <span style={{ float: 'right', color: '#d33fff', fontWeight: 700, fontSize: 18 }}>☆</span></div>
          </div>
          <div style={{ flex: 1, background: '#fff', border: '2px solid #d33fff', borderRadius: 12, padding: 16, minHeight: 90 }}>
            <div style={{ fontWeight: 600, color: '#222', marginBottom: 8 }}>Mejores áreas de ventas <span style={{ float: 'right', color: '#d33fff', fontWeight: 700, fontSize: 18 }}>☆</span></div>
          </div>
          <div style={{ flex: 1, background: '#fff', border: '2px solid #d33fff', borderRadius: 12, padding: 16, minHeight: 90 }}>
            <div style={{ fontWeight: 600, color: '#222', marginBottom: 8 }}>Método de pago</div>
            <div style={{ fontSize: 15, marginTop: 8 }}>
              <div>⭐ Efectivo <span style={{ float: 'right' }}>$ 0.00</span></div>
              <div>2. Transferencias <span style={{ float: 'right' }}>$ 0.00</span></div>
              <div>3. Tarjeta <span style={{ float: 'right' }}>$ 0.00</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MReportes;
