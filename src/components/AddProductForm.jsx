import React, { useState } from 'react';
import './AddProductForm.css';
import CategoryForm from './CategoryForm.jsx';

const AddProductForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    descripcion: '',
    codigo: '',
    costo: '',
    precio: '',
    cantidad: '',
    moneda: '',
  });
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Producto guardado:', formData);
    if (selectedImage) {
      console.log('Imagen seleccionada:', selectedImage);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
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
          capture="environment"  // sugiere abrir cámara primero, pero permite galería
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
        />

        <div className="category-section">
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="">Seleccionar Categoría de Producto</option>
            <option value="ropa">Ropa</option>
            <option value="tecnologia">Tecnología</option>
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
          />
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={formData.precio}
            onChange={handleChange}
          />
        </div>

        <div className="row-inputs">
          <input
            type="number"
            name="cantidad"
            placeholder="Cantidad"
            value={formData.cantidad}
            onChange={handleChange}
          />
          <select
            name="moneda"
            value={formData.moneda}
            onChange={handleChange}
          >
            <option value="">Moneda</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <button type="submit" className="save-btn">GUARDAR</button>
      </form>

      {showCategoryForm && (
        <CategoryForm
          onClose={() => setShowCategoryForm(false)}
        />
      )}
    </div>
  );
};

export default AddProductForm;