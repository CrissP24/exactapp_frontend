import React, { useState } from 'react';
import '../../css/MenuCss/EstiloProveedor.css';

const mockProveedores = [
  { id: 1, nombre: 'La Fabril', tipo: 'Mayorista', ruc: '', correo: '', celular: '' },
  { id: 2, nombre: 'El Arbolito', tipo: 'Minorista', ruc: '', correo: '', celular: '' },
];

const initialProveedor = { nombre: '', tipo: 'Minorista', ruc: '', correo: '', celular: '' };

const MProveedor = () => {
  const [proveedores, setProveedores] = useState(mockProveedores);
  const [selected, setSelected] = useState(0);
  const [form, setForm] = useState(initialProveedor);
  const [editIndex, setEditIndex] = useState(null);

  // Seleccionar proveedor para editar
  const handleSelect = (idx) => {
    setSelected(idx);
    setEditIndex(idx);
    setForm({ ...proveedores[idx] });
  };

  // Cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Guardar proveedor
  const handleSave = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...proveedores];
      updated[editIndex] = { ...form };
      setProveedores(updated);
    } else {
      setProveedores([...proveedores, { ...form, id: Date.now() }]);
    }
    setForm(initialProveedor);
    setEditIndex(null);
    setSelected(proveedores.length);
  };

  // Nuevo proveedor
  const handleNuevo = () => {
    setForm(initialProveedor);
    setEditIndex(null);
    setSelected(null);
  };

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
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: 30, gap: 20 }}>
        {/* Panel lista */}
        <div style={{ width: '48%', border: '2px solid #d33fff', borderRadius: 12, background: '#fff', padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 250 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
              <button style={{ background: 'none', border: 'none', fontSize: 28, color: '#6a1b9a', marginRight: 10, cursor: 'pointer' }}>&larr;</button>
              <h2 style={{ fontWeight: 700, fontSize: 22, margin: 0, letterSpacing: 2, fontFamily: 'monospace' }}>Lista de Proveedor</h2>
            </div>
            {proveedores.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => handleSelect(idx)}
                style={{
                  width: '100%',
                  marginBottom: 12,
                  background: selected === idx ? '#d1aaff' : '#fff',
                  color: selected === idx ? '#fff' : '#6a1b9a',
                  border: '2px solid #d33fff',
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 16,
                  padding: '10px 0',
                  transition: 'background 0.2s',
                  cursor: 'pointer',
                }}
              >
                {p.nombre} / {p.tipo}
              </button>
            ))}
          </div>
          <button
            onClick={handleNuevo}
            style={{ marginTop: 20, background: '#d33fff', color: '#fff', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 20, padding: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <span style={{ fontSize: 22, background: '#fff', color: '#d33fff', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>＋</span>
            Agregar  Proveedor
          </button>
        </div>
        {/* Panel formulario */}
        <div style={{ width: '48%', border: '2px solid #d33fff', borderRadius: 12, background: '#fff', padding: 20, minWidth: 250 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
            <button style={{ background: 'none', border: 'none', fontSize: 28, color: '#6a1b9a', marginRight: 10, cursor: 'pointer' }}>&larr;</button>
            <h2 style={{ fontWeight: 700, fontSize: 22, margin: 0, letterSpacing: 2, fontFamily: 'monospace' }}>{editIndex !== null ? 'Editar Proveedor' : 'Agregar Proveedor'}</h2>
          </div>
          <form onSubmit={handleSave}>
            <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre de la Empresa" style={{ width: '100%', marginBottom: 12, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} required />
            <input name="ruc" value={form.ruc} onChange={handleChange} placeholder="Ruc" style={{ width: '100%', marginBottom: 12, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} />
            <input name="correo" value={form.correo} onChange={handleChange} placeholder="Correo Electrónico" style={{ width: '100%', marginBottom: 12, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} required />
            <input name="celular" value={form.celular} onChange={handleChange} placeholder="Número de Celular" style={{ width: '100%', marginBottom: 12, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} required />
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, margin: '18px 0' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: '#6a1b9a' }}>
                <input type="radio" name="tipo" value="Minorista" checked={form.tipo === 'Minorista'} onChange={handleChange} style={{ accentColor: '#d33fff', width: 18, height: 18 }} />
                Minorista
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: '#d33fff' }}>
                <input type="radio" name="tipo" value="Mayorista" checked={form.tipo === 'Mayorista'} onChange={handleChange} style={{ accentColor: '#d33fff', width: 18, height: 18 }} />
                Mayorista
              </label>
            </div>
            <button type="submit" style={{ width: '60%', background: '#d33fff', color: '#fff', fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 20, padding: '10px 0', margin: '20px auto 0 auto', letterSpacing: 1, display: 'block' }}>Guardar Compra</button>
          </form>
        </div>
      </div>
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .proveedor-main-responsive {
            flex-direction: column !important;
            gap: 0 !important;
            padding: 10px !important;
          }
          .proveedor-panel-left, .proveedor-panel-right {
            width: 100% !important;
            max-width: 100% !important;
            margin-bottom: 20px !important;
          }
        }
        @media (max-width: 600px) {
          .proveedor-main-responsive {
            padding: 2px !important;
          }
          .proveedor-panel-left, .proveedor-panel-right {
            padding: 10px !important;
          }
        }
        @media (max-width: 700px) {
          .proveedor-main-responsive {
            flex-direction: column !important;
            gap: 0 !important;
          }
          .proveedor-panel-left, .proveedor-panel-right {
            width: 100% !important;
            max-width: 100% !important;
            padding: 8px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MProveedor;
