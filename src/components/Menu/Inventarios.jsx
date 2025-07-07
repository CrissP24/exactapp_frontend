import React, { useState } from 'react';
import '../../css/MenuCss/EstiloInventario.css';

const tabs = [
  { key: 'resumen', label: 'Resumen' },
  { key: 'resumen-dia', label: 'Resumen Día' },
  { key: 'ventas-productos', label: 'Ventas por Producto' },
  { key: 'ventas-mes', label: 'Ventas por Mes' },
];

const InventarioM = () => {
  const [tab, setTab] = useState('resumen');

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
        <h2 style={{ fontWeight: 700, fontSize: 22, color: '#222', marginBottom: 10 }}>Inventarios</h2>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                background: tab === t.key ? '#f8eaff' : '#fff',
                border: '2px solid #d33fff',
                borderRadius: '8px 8px 0 0',
                color: '#6a1b9a',
                fontWeight: 700,
                fontSize: 16,
                padding: '8px 24px',
                cursor: 'pointer',
                outline: 'none',
                borderBottom: tab === t.key ? '2px solid #fff' : '2px solid #d33fff',
                marginRight: 2,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        {/* Tab content */}
        <div style={{ border: '1.5px solid #d33fff', borderRadius: 12, background: '#fff', padding: 20, minHeight: 350 }}>
          {tab === 'resumen' && (
            <div>
              <div style={{ display: 'flex', gap: 0 }}>
                {/* Ventas */}
                <div style={{ flex: 1, border: '2px solid #d33fff', borderTopLeftRadius: 8, borderTopRightRadius: 0, borderBottom: 'none', background: '#f8eaff', marginRight: -2 }}>
                  <div style={{ fontWeight: 700, fontSize: 18, color: '#222', textAlign: 'center', padding: 8, borderBottom: '2px solid #d33fff', letterSpacing: 1 }}>VENTAS</div>
                  <div style={{ padding: 12 }}>
                    <div style={{ border: '2px solid #d33fff', borderRadius: 6, marginBottom: 10, padding: 6, background: '#fff' }}>Días - Mes - Año</div>
                    <div style={{ border: '2px solid #d33fff', borderRadius: 6, marginBottom: 10, padding: 6, background: '#fff' }}>25 - 05 - 2024</div>
                    <div style={{ border: '2px solid #d33fff', borderRadius: 6, marginBottom: 10, padding: 6, background: '#fff' }}>Texto</div>
                    <div style={{ border: '2px solid #d33fff', borderRadius: 6, padding: 6, background: '#fff' }}>Mayo - 2024</div>
                  </div>
                </div>
                {/* Compras */}
                <div style={{ flex: 1, border: '2px solid #d33fff', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottom: 'none', background: '#f8eaff', marginRight: -2 }}>
                  <div style={{ fontWeight: 700, fontSize: 18, color: '#222', textAlign: 'center', padding: 8, borderBottom: '2px solid #d33fff', letterSpacing: 1 }}>COMPRAS</div>
                  <div style={{ padding: 12 }}>
                    <div style={{ border: '2px solid #d33fff', borderRadius: 6, marginBottom: 10, padding: 6, background: '#fff' }}>Días - Mes - Año</div>
                    <div style={{ border: '2px solid #d33fff', borderRadius: 6, marginBottom: 10, padding: 6, background: '#fff' }}>25 - 05 - 2024</div>
                    <div style={{ border: '2px solid #d33fff', borderRadius: 6, marginBottom: 10, padding: 6, background: '#fff' }}>Texto</div>
                    <div style={{ border: '2px solid #d33fff', borderRadius: 6, padding: 6, background: '#fff' }}>&nbsp;</div>
                  </div>
                </div>
                {/* Resumen */}
                <div style={{ flex: 1, border: '2px solid #d33fff', borderTopLeftRadius: 0, borderTopRightRadius: 8, borderBottom: 'none', background: '#f8eaff' }}>
                  <div style={{ fontWeight: 700, fontSize: 18, color: '#222', textAlign: 'center', padding: 8, borderBottom: '2px solid #d33fff', letterSpacing: 1 }}>RESUMEN</div>
                  <div style={{ padding: 12 }}>
                    <div style={{ border: '2px solid #d33fff', borderRadius: 6, marginBottom: 10, padding: 6, background: '#fff' }}>Detalle del día</div>
                    <div style={{ border: '2px solid #d33fff', borderRadius: 6, marginBottom: 10, padding: 6, background: '#fff', fontSize: 14 }}>
                      Las compras fueron mayor que las ventas, con un margen de diferencia del <span style={{ color: '#d33fff', fontWeight: 700 }}>70%</span>
                    </div>
                    <div style={{ border: '2px solid #d33fff', borderRadius: 6, padding: 6, background: '#fff' }}>Texto</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {tab === 'resumen-dia' && (
            <div>
              <div style={{ border: '2px solid #d33fff', borderRadius: 8, background: '#f8eaff', marginBottom: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 18, color: '#222', padding: 10, borderBottom: '2px solid #d33fff', letterSpacing: 1 }}>RESUMEN 25 - 05 - 2024</div>
                <div style={{ padding: 20, background: '#fff', borderRadius: '0 0 8px 8px' }}>
                  {/* Simulación de gráfico */}
                  <svg width="100%" height="180" style={{ display: 'block', margin: '0 auto' }}>
                    <polyline
                      fill="none"
                      stroke="#6a1b9a"
                      strokeWidth="3"
                      points="20,160 80,150 140,160 200,120 260,160 320,40 380,160"
                    />
                    <circle cx="320" cy="40" r="6" fill="#6a1b9a" />
                    <text x="330" y="50" fontSize="13" fill="#6a1b9a">Ingresos</text>
                  </svg>
                  <div style={{ position: 'absolute', left: 60, top: 60, color: '#6a1b9a', fontWeight: 600, fontSize: 14, background: '#fff', border: '1px solid #d33fff', borderRadius: 6, padding: '2px 8px', display: 'inline-block' }}>
                    Mayo 1<br />Ingreso: $0.00
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 40, alignItems: 'center' }}>
                <div style={{ fontSize: 17 }}>Ventas <span style={{ marginLeft: 20 }}>$ 200</span></div>
                <div style={{ fontSize: 17 }}>Compras <span style={{ marginLeft: 20 }}>$ 500</span></div>
                <div style={{ fontSize: 17, background: '#b9fbc0', color: '#222', borderRadius: 6, padding: '4px 24px', fontWeight: 700, border: '1.5px solid #1b8a3a' }}>300</div>
              </div>
            </div>
          )}
          {tab === 'ventas-productos' && (
            <div>
              <div style={{ border: '2px solid #d33fff', borderRadius: 8, background: '#f8eaff', marginBottom: 20 }}>
                <div style={{ display: 'flex', fontWeight: 700, fontSize: 18, color: '#222', borderBottom: '2px solid #d33fff', letterSpacing: 1 }}>
                  <div style={{ flex: 1, textAlign: 'center', padding: 10 }}>CANTIDAD</div>
                  <div style={{ flex: 2, textAlign: 'center', padding: 10 }}>PRODUCTOS</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: 10 }}>TOTAL</div>
                </div>
                <div style={{ display: 'flex', borderBottom: '2px solid #d33fff', background: '#fff' }}>
                  <div style={{ flex: 1, textAlign: 'center', padding: 10 }}>2</div>
                  <div style={{ flex: 2, textAlign: 'center', padding: 10 }}>Camisetas</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: 10 }}>$ 50</div>
                </div>
                <div style={{ display: 'flex', borderBottom: '2px solid #d33fff', background: '#fff' }}>
                  <div style={{ flex: 1, textAlign: 'center', padding: 10 }}>4</div>
                  <div style={{ flex: 2, textAlign: 'center', padding: 10 }}>Pantalones</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: 10 }}>$ 200</div>
                </div>
                <div style={{ display: 'flex', borderBottom: '2px solid #d33fff', background: '#fff' }}>
                  <div style={{ flex: 1, textAlign: 'center', padding: 10 }}>Texto</div>
                  <div style={{ flex: 2, textAlign: 'center', padding: 10 }}>Texto</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: 10 }}>Texto</div>
                </div>
                <div style={{ display: 'flex', background: '#fff' }}>
                  <div style={{ flex: 1, textAlign: 'center', padding: 10 }}>Texto</div>
                  <div style={{ flex: 2, textAlign: 'center', padding: 10 }}>Texto</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: 10 }}>Texto</div>
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: 10, fontSize: 16, color: '#222' }}>
                <span>Total de ventas del día 25 de mayo del 2024</span>
                <span style={{ display: 'inline-block', marginLeft: 16, border: '2px solid #d33fff', borderRadius: 6, padding: '2px 18px', color: '#d33fff', fontWeight: 700, fontSize: 18 }}>$ 250</span>
              </div>
            </div>
          )}
          {tab === 'ventas-mes' && (
            <div>
              <div style={{ border: '2px solid #d33fff', borderRadius: 8, background: '#f8eaff', marginBottom: 20 }}>
                <div style={{ display: 'flex', fontWeight: 700, fontSize: 18, color: '#222', borderBottom: '2px solid #d33fff', letterSpacing: 1 }}>
                  <div style={{ flex: 2, textAlign: 'center', padding: 10 }}>MAYO</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: 10 }}>TOTAL</div>
                </div>
                <div style={{ display: 'flex', borderBottom: '2px solid #d33fff', background: '#fff' }}>
                  <div style={{ flex: 2, textAlign: 'center', padding: 10 }}>01 de mayo 2024</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: 10 }}>$ 300</div>
                </div>
                <div style={{ display: 'flex', borderBottom: '2px solid #d33fff', background: '#fff' }}>
                  <div style={{ flex: 2, textAlign: 'center', padding: 10 }}>02 de mayo 2024</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: 10 }}>$ xxx</div>
                </div>
                <div style={{ display: 'flex', background: '#fff' }}>
                  <div style={{ flex: 2, textAlign: 'center', padding: 10 }}>2 de mayo 2024</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: 10 }}>$ 250</div>
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: 10, fontSize: 16, color: '#222' }}>
                <span>Total de ventas del mes de mayo del 2024</span>
                <span style={{ display: 'inline-block', marginLeft: 16, border: '2px solid #d33fff', borderRadius: 6, padding: '2px 18px', color: '#d33fff', fontWeight: 700, fontSize: 18 }}>$ 550</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventarioM;
