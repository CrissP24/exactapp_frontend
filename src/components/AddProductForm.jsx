import React, { useState } from 'react';
import './AddProductForm.css';

const variacionesList = ["Tamaño", "Capacidad", "Color", "Peso"];

const AddProductForm = ({ onClose, onSave, categories, setCategories }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    descripcion: '',
    codigo: '',
    costo: '',
    precio: '',
    cantidad: '',
    moneda: 'USD',
    imagen: null,
  });
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [catNombre, setCatNombre] = useState('');
  const [catVariaciones, setCatVariaciones] = useState([]);
  const [catError, setCatError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imagen: reader.result }));
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.categoria) return;
    onSave(formData);
  };

  // --- NUEVO: Submodal de categoría ---
  const handleToggleVariacion = (v) => {
    setCatVariaciones((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    setCatError('');
    if (!catNombre.trim()) {
      setCatError('El nombre es obligatorio');
      return;
    }
    const newCat = {
      id: Date.now().toString(),
      nombre: catNombre.trim(),
      variaciones: catVariaciones,
    };
    const newCategories = [...categories, newCat];
    setCategories(newCategories);
    localStorage.setItem('categorias', JSON.stringify(newCategories));
    setFormData((prev) => ({ ...prev, categoria: newCat.id }));
    setCatNombre('');
    setCatVariaciones([]);
    setShowCategoryForm(false);
  };

  return (
    <div className="form-container-product">
      <button className="close-btn" onClick={onClose}>X</button>
      <h2>Agregar Nuevo Producto</h2>

      <div className="icon-section">
        <button
          type="button"
          className="icon-btn"
          onClick={() => document.getElementById('image-upload').click()}
        >
          📷
        </button>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <button type="button" className="color-btn">Color</button>
        <button type="button" className="price-btn">📇<br />Nombre<br />Precio</button>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del Producto"
          value={formData.nombre}
          onChange={handleChange}
          required
        />

        <div className="category-section">
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar Categoría de Producto</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
          <button
            type="button"
            className="mas-button"
            onClick={() => setShowCategoryForm(true)}
          >
            +
          </button>
        </div>

        <input
          type="text"
          name="descripcion"
          placeholder="Descripción (opcional)"
          value={formData.descripcion}
          onChange={handleChange}
        />

        <input
          type="text"
          name="codigo"
          placeholder="Código del Producto (opcional)"
          value={formData.codigo}
          onChange={handleChange}
        />

        <div className="row-inputs">
          <input
            type="number"
            name="costo"
            placeholder="Costo"
            value={formData.costo}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row-inputs">
          <input
            type="number"
            name="cantidad"
            placeholder="Cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            required
          />
          <select
            name="moneda"
            value={formData.moneda}
            onChange={handleChange}
            required
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <button type="submit" className="save-btn">GUARDAR</button>
      </form>

      {/* SUBMODAL DE CATEGORÍA */}
      {showCategoryForm && (
        <div className="modal-overlay" style={{ zIndex: 2000 }}>
          <div className="modal" style={{ background: '#fff', border: '2px solid #d33fff', borderRadius: 16, minWidth: 320, maxWidth: 400, width: '95vw', padding: 24, boxShadow: '0 0 20px #d8b4e2', margin: 'auto' }}>
            <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 16 }}>Agregar Categorías</h2>
            <form onSubmit={handleSaveCategory}>
              <label style={{ fontWeight: 600, marginBottom: 4, display: 'block' }}>Nombre</label>
              <input
                type="text"
                value={catNombre}
                onChange={e => setCatNombre(e.target.value)}
                placeholder="Nombre del Producto"
                style={{ width: '100%', marginBottom: 16, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#f8eaff' }}
                required
              />
              <div style={{ marginBottom: 16, textAlign: 'center', fontWeight: 600 }}>Seleccionar Variaciones</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', marginBottom: 16 }}>
                {variacionesList.map(v => (
                  <label key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                    <input type="checkbox" checked={catVariaciones.includes(v)} onChange={() => handleToggleVariacion(v)} style={{ accentColor: '#d33fff', width: 20, height: 20 }} />
                    <span style={{ fontWeight: 500 }}>{v}</span>
                  </label>
                ))}
              </div>
              {catError && <div style={{ color: 'red', marginBottom: 8 }}>{catError}</div>}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                <button type="button" onClick={() => setShowCategoryForm(false)} style={{ background: '#eee', color: '#333', border: 'none', borderRadius: 6, padding: '8px 24px', fontWeight: 700 }}>Cancelar</button>
                <button type="submit" style={{ background: '#d33fff', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 24px', fontWeight: 700 }}>GUARDAR</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductForm;