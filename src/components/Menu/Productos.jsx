import React, { useState, useEffect } from "react";
import "../../css/MenuCss/EstiloProducto.css";

const MProducto = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // Estado para manejar la edición
  const [newProduct, setNewProduct] = useState({
    companiaId: "c8faa65e-1343-46e4-b0de-fe3b3a82d709",
    categoriaId: "",
    codigo: "",
    codigoAuxiliar: "",
    nombre: "",
    valor: 0,
    precio: 0, // Nuevo campo para el precio
    stock: 0,
    codigoTipoImpuesto: "s",
    codigoIva: "s",
    porcentajeIva: 0,
    codigoIce: "string",
    porcentajeIce: 0,
    descripcion: "",
  });
  const [newCategory, setNewCategory] = useState({
    nombre: "",
    orden: 0,
    app: "Exact-App",
    enabled: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const COMPANIA_ID = "c8faa65e-1343-46e4-b0de-fe3b3a82d709";
  const CATEGORIA_API_URL = "https://aadministracion.infor-business.com/api/1.0/Categoria";

  // Cargar productos y categorías desde localStorage al montar el componente
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }

    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  // Guardar productos y categorías en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  // Obtener categorías desde la API
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(CATEGORIA_API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Error al obtener las categorías");
        const result = await response.json();
        setCategories(result.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Manejar cambios en los inputs del formulario de producto
  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]:
        name === "valor" || name === "precio" || name === "stock" || name === "porcentajeIva" || name === "porcentajeIce"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  // Manejar cambios en los inputs del formulario de categoría
  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      [name]: name === "orden" ? parseInt(value) : value,
    }));
  };

  // Manejar el envío del formulario para agregar o editar un producto
  const handleAddProduct = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validar campos requeridos
    if (!newProduct.nombre) {
      setError("El nombre del producto es obligatorio");
      setLoading(false);
      return;
    }
    if (!newProduct.categoriaId) {
      setError("Debe seleccionar una categoría");
      setLoading(false);
      return;
    }
    if (newProduct.valor <= 0) {
      setError("El costo debe ser mayor que 0");
      setLoading(false);
      return;
    }
    if (newProduct.precio <= 0) {
      setError("El precio debe ser mayor que 0");
      setLoading(false);
      return;
    }

    // Crear el objeto del producto
    const productToAdd = {
      ...newProduct,
      id: editingProduct ? editingProduct.id : Date.now().toString(), // Usar el ID existente si se está editando
      codigo: newProduct.codigo || "",
      codigoAuxiliar: newProduct.codigo || "",
      descripcion: newProduct.descripcion || "",
    };

    // Si estamos editando, actualizamos el producto existente
    if (editingProduct) {
      setProducts(products.map((prod) => (prod.id === editingProduct.id ? productToAdd : prod)));
      setSuccess("Producto actualizado correctamente");
    } else {
      // Si no estamos editando, agregamos un nuevo producto
      setProducts([...products, productToAdd]);
      setSuccess("Producto agregado correctamente");
    }

    // Resetear el formulario
    setShowAddForm(false);
    setEditingProduct(null);
    setNewProduct({
      companiaId: "c8faa65e-1343-46e4-b0de-fe3b3a82d709",
      categoriaId: "",
      codigo: "",
      codigoAuxiliar: "",
      nombre: "",
      valor: 0,
      precio: 0,
      stock: 0,
      codigoTipoImpuesto: "s",
      codigoIva: "s",
      porcentajeIva: 0,
      codigoIce: "string",
      porcentajeIce: 0,
      descripcion: "",
    });
    setTimeout(() => setSuccess(""), 3000);
    setLoading(false);
  };

  // Manejar el envío del formulario para agregar una nueva categoría
  const handleAddCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const payload = {
        id: "",
        nombre: newCategory.nombre,
        orden: newCategory.orden || categories.length + 1,
        app: "Exact-App",
        enabled: true,
      };

      console.log("Payload being sent to category API:", payload);

      const response = await fetch(CATEGORIA_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al agregar la categoría: ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log("Response from category API:", result);

      setCategories([...categories, result.data]);
      setNewCategory({
        nombre: "",
        orden: 0,
        app: "Exact-App",
        enabled: true,
      });
      setSuccess("Categoría agregada correctamente");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error adding category:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Manejar la edición de un producto
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      ...product,
      precio: product.precio || product.valor + 100, // Si no hay precio, usar el valor anterior
    });
    setShowAddForm(true);
  };

  // Manejar la eliminación de un producto
  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((prod) => prod.id !== productId));
    setSuccess("Producto eliminado correctamente");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div className="producto-container">
      <button className="back-button" onClick={() => window.history.back()}>
        ←
      </button>
      <h2>PRODUCTOS</h2>
      <button className="add-product-button" onClick={() => setShowAddForm(true)}>
        + NUEVO PRODUCTO
      </button>

      <table className="product-table">
        <thead>
          <tr>
            <th>PRODUCTO</th>
            <th>CATEGORÍA</th>
            <th>COMPRADO</th>
            <th>EXISTENCIA</th>
            <th>MONEDA</th>
            <th>COSTO</th>
            <th>PRECIO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <span className="product-icon">📦</span> {product.nombre}
              </td>
              <td>
                {categories.find((cat) => cat.id === product.categoriaId)?.nombre || "Sin categoría"}
              </td>
              <td className="comprado">{product.stock || 0}</td>
              <td className="existencia">{product.stock || 0}</td>
              <td>Dolar</td>
              <td className="costo">${product.valor || 0}.00</td>
              <td className="precio">${product.precio || 0}.00</td>
              <td>
                <button className="edit-button" onClick={() => handleEditProduct(product)}>
                  ✏️
                </button>
                <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Product Form (I-4.1) */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingProduct ? "Editar Producto" : "Agregar Nuevo Producto"}</h3>
            <button className="close-button" onClick={() => { setShowAddForm(false); setEditingProduct(null); }}>
              X
            </button>
            <form onSubmit={handleAddProduct}>
              <div className="form-group">
                <label>Nombre del Producto</label>
                <input
                  type="text"
                  name="nombre"
                  value={newProduct.nombre}
                  onChange={handleProductInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Seleccione Categoría</label>
                <select
                  name="categoriaId"
                  value={newProduct.categoriaId}
                  onChange={handleProductInputChange}
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={() => setShowCategoryForm(true)}>
                  Categorías del negocio
                </button>
              </div>
              <div className="form-group">
                <label>Descripción (opcional)</label>
                <textarea
                  name="descripcion"
                  value={newProduct.descripcion}
                  onChange={handleProductInputChange}
                />
              </div>
              <div className="form-group">
                <label>Código del Producto (opcional)</label>
                <input
                  type="text"
                  name="codigo"
                  value={newProduct.codigo}
                  onChange={handleProductInputChange}
                />
              </div>
              <div className="form-group">
                <label>Costo</label>
                <input
                  type="number"
                  name="valor"
                  value={newProduct.valor}
                  onChange={handleProductInputChange}
                  required
                  min="0.01"
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label>Precio</label>
                <input
                  type="number"
                  name="precio"
                  value={newProduct.precio}
                  onChange={handleProductInputChange}
                  required
                  min="0.01"
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label>Moneda</label>
                <select name="moneda" value="USD" disabled>
                  <option value="USD">USD</option>
                </select>
              </div>
              <div className="form-group">
                <label>Stock Inicial</label>
                <input
                  type="number"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleProductInputChange}
                  min="0"
                />
              </div>
              <button type="submit" className="add-product-submit">
                {editingProduct ? "Actualizar" : "Guardar"}
              </button>
            </form>
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      )}

      {/* Category Form (I-4.2) */}
      {showCategoryForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Categorías</h3>
            <button className="close-button" onClick={() => setShowCategoryForm(false)}>
              X
            </button>
            <div className="form-group">
              <input type="text" placeholder="Buscar Categorías" />
            </div>
            <div className="form-group">
              <label>Nombre de la Categoría</label>
              <input
                type="text"
                placeholder="Agregar Categoría"
                name="nombre"
                value={newCategory.nombre}
                onChange={handleCategoryInputChange}
              />
            </div>
            <div className="form-group">
              <label>Orden</label>
              <input
                type="number"
                name="orden"
                value={newCategory.orden}
                onChange={handleCategoryInputChange}
                placeholder="Orden (opcional)"
              />
            </div>
            <div className="form-group">
              <button onClick={handleAddCategory}>Agregar Categoría</button>
            </div>
            <div className="form-group">
              <h4>Lista de categorías agregadas</h4>
              <ul>
                {categories.map((category) => (
                  <li key={category.id}>{category.nombre}</li>
                ))}
              </ul>
            </div>
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      )}

      {loading && <p>Cargando...</p>}
    </div>
  );
};

export default MProducto;