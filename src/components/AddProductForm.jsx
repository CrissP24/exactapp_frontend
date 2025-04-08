import React, { useState } from 'react';
import './AddProductForm.css'; // Asegúrate de que la ruta sea correcta

const AddProductForm = ({ categories, onClose, onOpenCategoryForm }) => {
  const [product, setProduct] = useState({
    companiaId: "c8faa65e-1343-46e4-b0de-fe3b3a82d709",
    categoriaId: "",
    codigo: "",
    codigoAuxiliar: "",
    nombre: "",
    valor: 0, // Costo
    precio: 0, // Precio (nuevo campo que el usuario ingresará manualmente)
    stock: 0,
    codigoTipoImpuesto: "s",
    codigoIva: "s",
    porcentajeIva: 0,
    codigoIce: "string",
    porcentajeIce: 0,
    descripcion: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]); // Lista para almacenar productos localmente

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        name === "valor" || name === "precio" || name === "stock"
          ? parseFloat(value) || 0 // Convertir a número, o 0 si no es válido
          : value,
    }));
  };

  const handleCategorySubmit = (newCategory) => {
    setCategoriesList((prev) => [...prev, newCategory]);
    setShowCategoryForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validar campos requeridos
    if (!product.nombre) {
      setError("El nombre del producto es obligatorio");
      return;
    }
    if (!product.categoriaId) {
      setError("Debe seleccionar una categoría");
      return;
    }
    if (product.valor <= 0) {
      setError("El costo debe ser mayor que 0");
      return;
    }
    if (product.precio <= 0) {
      setError("El precio debe ser mayor que 0");
      return;
    }

    // Crear el payload del producto
    const payload = {
      companiaId: "c8faa65e-1343-46e4-b0de-fe3b3a82d709",
      categoriaId: product.categoriaId,
      codigo: product.codigo || "",
      codigoAuxiliar: product.codigo || "",
      nombre: product.nombre,
      valor: parseFloat(product.valor),
      precio: parseFloat(product.precio), // Incluir el precio ingresado manualmente
      stock: product.stock || 0,
      codigoTipoImpuesto: "s",
      codigoIva: "s",
      porcentajeIva: 0,
      codigoIce: "string",
      porcentajeIce: 0,
      descripcion: product.descripcion || "",
    };

    console.log("Producto que se guardará localmente:", payload); // Debug log

    // Guardar el producto localmente en lugar de enviarlo a la API
    setSavedProducts((prev) => [...prev, payload]);

    // Mostrar mensaje de éxito
    setSuccess("Guardado correctamente");
    setTimeout(() => {
      onClose();
      setSuccess("");
    }, 2000);
  };

  return (
    <div className="floating-form">
      <div className="form-content">
        <h3>Agregar Nuevo Producto</h3>
        <button className="close-btn" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre del Producto</label>
            <input
              type="text"
              name="nombre"
              value={product.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Seleccione Categoría</label>
            <select
              name="categoriaId"
              value={product.categoriaId}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una categoría</option>
              {categoriesList.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => setShowCategoryForm(true)}>
              Agregar Categoría
            </button>
          </div>
          <div>
            <label>Descripción (opcional)</label>
            <textarea
              name="descripcion"
              value={product.descripcion}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Código del Producto (opcional)</label>
            <input
              type="text"
              name="codigo"
              value={product.codigo}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Costo</label>
            <input
              type="number"
              name="valor"
              value={product.valor}
              onChange={handleChange}
              required
              min="0.01"
              step="0.01"
            />
          </div>
          <div>
            <label>Precio</label>
            <input
              type="number"
              name="precio"
              value={product.precio}
              onChange={handleChange}
              required
              min="0.01"
              step="0.01"
            />
          </div>
          <div>
            <label>Stock (opcional)</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              min="0"
              step="1"
            />
          </div>
          <div>
            <label>Moneda</label>
            <select name="moneda" value="USD" disabled>
              <option value="USD">USD</option>
            </select>
          </div>
          <button type="submit" className="save-btn">
            Guardar
          </button>
        </form>
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
        <div className="category-list">
          <h4>Lista de Categorías Agregadas</h4>
          {categoriesList.length > 0 ? (
            <ul>
              {categoriesList.map((category, index) => (
                <li key={index}>{category}</li>
              ))}
            </ul>
          ) : (
            <p>Lista de categorías agregadas</p>
          )}
        </div>
        <div className="product-list">
          <h4>Productos Guardados</h4>
          {savedProducts.length > 0 ? (
            <ul>
              {savedProducts.map((prod, index) => (
                <li key={index}>
                  {prod.nombre} - Costo: ${prod.valor} - Precio: ${prod.precio} - Stock: {prod.stock}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay productos guardados</p>
          )}
        </div>
      </div>

      {showCategoryForm && (
        <CategoryForm
          onClose={() => setShowCategoryForm(false)}
          onSubmit={handleCategorySubmit}
        />
      )}
    </div>
  );
};

const CategoryForm = ({ onClose, onSubmit }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(categoryName);
    setCategoryName("");
  };

  return (
    <div className="floating-form">
      <div className="form-content">
        <h3>Agregar Categorías</h3>
        <button className="close-btn" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="save-btn">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;