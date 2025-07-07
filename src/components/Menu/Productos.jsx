import React, { useState } from "react";
import "../../css/MenuCss/EstiloProducto.css";

// Datos simulados
const mockCategories = [
  { id: "1", nombre: "Electrónica" },
  { id: "2", nombre: "Borracheras" },
];

const mockProducts = [
  {
    id: "a1",
    nombre: "Laptop Lenovo",
    categoriaId: "1",
    comprado: 50,
    existencia: 20,
    moneda: "Dolar",
    valor: 200,
    precio: 300,
    descripcion: "Laptop de oficina",
    codigo: "LEN123",
    imagen: null,
  },
  {
    id: "a2",
    nombre: "Cerveza Club",
    categoriaId: "2",
    comprado: 300,
    existencia: 5,
    moneda: "Dolar",
    valor: 2,
    precio: 3,
    descripcion: "Cerveza nacional",
    codigo: "CLUB01",
    imagen: null,
  },
];

const initialProduct = {
  nombre: "",
  categoriaId: "",
  descripcion: "",
  codigo: "",
  valor: "",
  precio: "",
  existencia: "",
  moneda: "Dolar",
  imagen: null,
};

const initialCategory = {
  nombre: "",
  variaciones: [],
};

const variacionesList = ["Tamaño", "Capacidad", "Color", "Peso"];

const MProducto = () => {
  const [products, setProducts] = useState(mockProducts);
  const [categories, setCategories] = useState(mockCategories);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newProduct, setNewProduct] = useState(initialProduct);
  const [newCategory, setNewCategory] = useState(initialCategory);
  const [categorySearch, setCategorySearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setProducts(products.filter((p) => p.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const openAddModal = () => {
    setNewProduct(initialProduct);
    setSelectedCategory(null);
    setIsEditing(false);
    setEditId(null);
    setShowAddModal(true);
  };

  const openEditModal = (product) => {
    setNewProduct(product);
    setSelectedCategory(categories.find(c => c.id === product.categoriaId) || null);
    setIsEditing(true);
    setEditId(product.id);
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setIsEditing(false);
    setEditId(null);
  };

  const openCategoryModal = () => setShowCategoryModal(true);

  const closeCategoryModal = () => setShowCategoryModal(false);

  const openAddCategoryModal = () => setShowAddCategoryModal(true);

  const closeAddCategoryModal = () => setShowAddCategoryModal(false);

  const handleProductChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen") {
      setNewProduct((prev) => ({ ...prev, imagen: files[0] }));
    } else {
      setNewProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!newProduct.nombre || !newProduct.categoriaId) return;
    if (isEditing && editId) {
      setProducts(products.map(p => p.id === editId ? { ...newProduct, id: editId } : p));
    } else {
      setProducts([
        ...products,
        {
          ...newProduct,
          id: Date.now().toString(),
          comprado: newProduct.existencia,
        },
      ]);
    }
    setShowAddModal(false);
    setIsEditing(false);
    setEditId(null);
  };

  const handleCategoryChange = (e) => {
    setNewCategory((prev) => ({ ...prev, nombre: e.target.value }));
  };

  const handleToggleVariacion = (v) => {
    setNewCategory((prev) => ({
      ...prev,
      variaciones: prev.variaciones.includes(v)
        ? prev.variaciones.filter((x) => x !== v)
        : [...prev.variaciones, v],
    }));
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!newCategory.nombre) return;
    const newCat = {
      id: Date.now().toString(),
      nombre: newCategory.nombre,
      variaciones: newCategory.variaciones,
    };
    setCategories([...categories, newCat]);
    setNewCategory(initialCategory);
    setShowAddCategoryModal(false);
    setShowCategoryModal(true);
  };

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setNewProduct((prev) => ({ ...prev, categoriaId: cat.id }));
    setShowCategoryModal(false);
  };

  const getCategory = (id) => categories.find((c) => c.id === id)?.nombre || "-";

  const filteredCategories = categories.filter((cat) =>
    cat.nombre.toLowerCase().includes(categorySearch.toLowerCase())
  );

  return (
    <div className="producto-container">
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <div style={{ textAlign: "right", marginRight: 30 }}>
          <div>Nombre del Negocio</div>
          <div>Categoria del negocio</div>
        </div>
        <div style={{ border: "2px solid #d8b4e2", borderRadius: "50%", width: 60, height: 60, display: "flex", alignItems: "center", justifyContent: "center", background: "#f3e5f5", marginLeft: 10 }}>
          <span style={{ fontSize: 40 }}>👤</span>
        </div>
      </div>
      <div className="producto-box">
        <h2 style={{ textAlign: "center", fontWeight: 700, color: "#6a1b9a", margin: 0, marginBottom: 10 }}>PRODUCTOS</h2>
        <button className="add-product-button" onClick={openAddModal} style={{ float: "right", marginBottom: 10, background: "#d8b4e2", color: "#6a1b9a", fontWeight: 700, fontSize: 18, border: "2px solid #d33fff", borderRadius: 20, padding: "8px 24px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 24, marginRight: 5 }}>＋</span> NUEVO PRODUCTO
        </button>
        <table className="product-table" style={{ border: "2px solid #d33fff", borderRadius: 10, width: "100%", marginTop: 30 }}>
          <thead>
            <tr>
              <th>PRODUCTO</th>
              <th>CATEGORÍA</th>
              <th>COMPRADO</th>
              <th>EXISTENCIA</th>
              <th>MONEDA</th>
              <th>COSTO</th>
              <th>PRECIO</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx) => (
              <tr key={p.id}>
                <td style={{ background: "#fff" }}>
                  <span style={{ fontSize: 24, marginRight: 5 }}>🖥️</span>
                  <span style={{ background: idx === 0 ? "#ffb6e6" : "#b2ffc3", borderRadius: 6, padding: "2px 10px", fontWeight: 600 }}>{p.nombre}</span>
                </td>
                <td>
                  <span style={{ background: idx === 0 ? "#ffb6e6" : "#b2ffc3", borderRadius: 6, padding: "2px 10px", fontWeight: 600 }}>{getCategory(p.categoriaId)}</span>
                </td>
                <td>
                  <span style={{ background: idx === 0 ? "#ffb6e6" : "#b2ffc3", borderRadius: 6, padding: "2px 10px", fontWeight: 600 }}>{p.comprado}</span>
                </td>
                <td>
                  <span style={{ background: idx === 0 ? "#ffb6e6" : "#b2ffc3", borderRadius: 6, padding: "2px 10px", fontWeight: 600 }}>{p.existencia}</span>
                </td>
                <td>
                  <span style={{ background: idx === 0 ? "#ffb6e6" : "#b2ffc3", borderRadius: 6, padding: "2px 10px", fontWeight: 600 }}>{p.moneda}</span>
                </td>
                <td>
                  <span style={{ background: idx === 0 ? "#ffb6e6" : "#b2ffc3", borderRadius: 6, padding: "2px 10px", fontWeight: 600 }}>${p.valor.toFixed(2)}</span>
                </td>
                <td>
                  <span style={{ background: idx === 0 ? "#ffb6e6" : "#b2ffc3", borderRadius: 6, padding: "2px 10px", fontWeight: 600 }}>${p.precio.toFixed(2)}</span>
                </td>
                <td>
                  <button className="edit-button" style={{ fontSize: 22, color: "#6a1b9a", background: "none", border: "none", marginRight: 8 }} onClick={() => openEditModal(p)}>
                    ✏️
                  </button>
                  <button className="delete-button" style={{ fontSize: 28, color: "#6a1b9a", background: "none", border: "none" }} onClick={() => handleDeleteClick(p.id)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
            {/* Rellenar filas vacías */}
            {Array.from({ length: 6 - products.length }).map((_, i) => (
              <tr key={"empty-" + i}>
                {Array.from({ length: 8 }).map((_, j) => (
                  <td key={j} style={{ background: "#fff", height: 40 }}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <div className="modal-overlay" style={{ zIndex: 1000 }}>
          <div className="modal" style={{ background: "#f3e5f5", border: "2px solid #d33fff", borderRadius: 20, maxWidth: 400, textAlign: "center", boxShadow: "0 0 20px #d8b4e2" }}>
            <div style={{ fontSize: 80, color: "#6a1b9a", fontWeight: 900, marginBottom: 10 }}>X</div>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>¿Estas seguro de que quieres eliminar este producto?</div>
            <button style={{ background: "#d33fff", color: "#fff", fontWeight: 700, fontSize: 20, border: "none", borderRadius: 10, padding: "10px 40px", marginTop: 10, cursor: "pointer" }} onClick={confirmDelete}>
              ACEPTAR
            </button>
          </div>
        </div>
      )}
      {/* Modal agregar producto */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal" style={{ background: "#f8eaff", border: "2px solid #d33fff", borderRadius: 16, minWidth: 320, maxWidth: 400, width: "95vw", padding: 24, boxShadow: '0 0 20px #d8b4e2' }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <h3 style={{ fontWeight: 600, fontSize: 20, margin: 0 }}>{isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h3>
              <button style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer" }} onClick={closeAddModal}>×</button>
            </div>
            <form onSubmit={handleSaveProduct}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <label style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
                  <span style={{ fontSize: 40, border: '2px solid #d33fff', borderRadius: 8, padding: 8, background: '#fff', marginBottom: 4 }}>📷</span>
                  <input type="file" name="imagen" accept="image/*" style={{ display: "none" }} onChange={handleProductChange} />
                  <span style={{ fontSize: 12, color: "#6a1b9a" }}>Cargar</span>
                </label>
                <div style={{ flex: 1 }}></div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <span style={{ fontSize: 32, border: '2px solid #d33fff', borderRadius: 8, padding: 8, background: '#fff', marginBottom: 4 }}>🖥️</span>
                  <span style={{ fontSize: 12, color: "#6a1b9a" }}>Nombre Precio</span>
                </div>
              </div>
              <input name="nombre" value={newProduct.nombre} onChange={handleProductChange} placeholder="Nombre del Producto" style={{ width: "100%", marginBottom: 8, border: "2px solid #d33fff", borderRadius: 6, padding: 8, background: '#fff' }} required />
              <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                <input
                  name="categoriaNombre"
                  value={getCategory(newProduct.categoriaId) || "Seleccionar Categoría de Producto"}
                  readOnly
                  style={{ flex: 1, border: "2px solid #d33fff", borderRadius: 6, padding: 8, background: "#fff", cursor: "pointer" }}
                  onClick={openCategoryModal}
                  required
                />
                <button type="button" onClick={openCategoryModal} style={{ marginLeft: 8, background: "#d33fff", color: "#fff", border: "none", borderRadius: 6, padding: "8px 12px", fontWeight: 700, cursor: "pointer" }}>&gt;</button>
              </div>
              <input name="descripcion" value={newProduct.descripcion} onChange={handleProductChange} placeholder="Descripción (opcional)" style={{ width: "100%", marginBottom: 8, border: "2px solid #d33fff", borderRadius: 6, padding: 8, background: '#fff' }} />
              <input name="codigo" value={newProduct.codigo} onChange={handleProductChange} placeholder="Código del Producto (opcional)" style={{ width: "100%", marginBottom: 8, border: "2px solid #d33fff", borderRadius: 6, padding: 8, background: '#fff' }} />
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <input name="valor" value={newProduct.valor} onChange={handleProductChange} placeholder="Costo" style={{ flex: 1, border: "2px solid #d33fff", borderRadius: 6, padding: 8, background: '#fff' }} required />
                <input name="precio" value={newProduct.precio} onChange={handleProductChange} placeholder="Precio" style={{ flex: 1, border: "2px solid #d33fff", borderRadius: 6, padding: 8, background: '#fff' }} required />
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <input name="existencia" value={newProduct.existencia} onChange={handleProductChange} placeholder="Cantidad" style={{ flex: 1, border: "2px solid #d33fff", borderRadius: 6, padding: 8, background: '#fff' }} required />
                <select name="moneda" value={newProduct.moneda} onChange={handleProductChange} style={{ flex: 1, border: "2px solid #d33fff", borderRadius: 6, padding: 8, background: '#fff' }}>
                  <option value="Dolar">Moneda</option>
                  <option value="Dolar">Dólar</option>
                  <option value="Euro">Euro</option>
                </select>
              </div>
              <button type="submit" style={{ width: "100%", background: "#d33fff", color: "#fff", fontWeight: 700, fontSize: 18, border: "none", borderRadius: 20, padding: "10px 0", marginTop: 10, letterSpacing: 1 }}>GUARDAR</button>
            </form>
          </div>
        </div>
      )}
      {/* Modal seleccionar/agregar categoría */}
      {showCategoryModal && (
        <div className="modal-overlay">
          <div className="modal" style={{ background: "#f8eaff", border: "2px solid #d33fff", borderRadius: 16, minWidth: 320, maxWidth: 400, width: "95vw", padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <h3 style={{ fontWeight: 600, fontSize: 20, margin: 0 }}>Categorías</h3>
              <button style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer" }} onClick={closeCategoryModal}>×</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 24, marginRight: 8 }}>🔍</span>
              <input
                type="text"
                placeholder="Buscar Categorías"
                value={categorySearch}
                onChange={e => setCategorySearch(e.target.value)}
                style={{ flex: 1, border: "2px solid #d33fff", borderRadius: 6, padding: 8 }}
              />
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <button onClick={openAddCategoryModal} style={{ background: "#d33fff", color: "#fff", border: "none", borderRadius: 6, padding: "8px 12px", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 20 }}>＋</span> Agregar Categoría
              </button>
              <div style={{ flex: 1, background: "#fff", border: "2px solid #d33fff", borderRadius: 6, padding: 8, textAlign: "center" }}>N° Categorías</div>
            </div>
            <div style={{ minHeight: 120, background: "#fff", border: "2px solid #d33fff", borderRadius: 6, padding: 8, color: "#bbb", textAlign: "center", fontSize: 18, display: filteredCategories.length ? 'none' : 'block' }}>
              Lista de categorías agregadas
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, maxHeight: 120, overflowY: "auto" }}>
              {filteredCategories.map(cat => (
                <li key={cat.id} style={{ padding: 6, cursor: "pointer", borderBottom: "1px solid #eee" }} onClick={() => handleSelectCategory(cat)}>
                  {cat.nombre}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {/* Modal agregar categoría */}
      {showAddCategoryModal && (
        <div className="modal-overlay">
          <div className="modal" style={{ background: "#f8eaff", border: "2px solid #d33fff", borderRadius: 16, minWidth: 320, maxWidth: 400, width: "95vw", padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <h3 style={{ fontWeight: 600, fontSize: 20, margin: 0 }}>Agregar Categorías</h3>
              <button style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer" }} onClick={closeAddCategoryModal}>×</button>
            </div>
            <form onSubmit={handleSaveCategory}>
              <input name="nombre" value={newCategory.nombre} onChange={handleCategoryChange} placeholder="Nombre del Producto" style={{ width: "100%", marginBottom: 16, border: "2px solid #d33fff", borderRadius: 6, padding: 8 }} required />
              <div style={{ marginBottom: 16, textAlign: "center" }}>Seleccionar Variaciones</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 16 }}>
                {variacionesList.map(v => (
                  <label key={v} style={{ display: "flex", alignItems: "center", gap: 4, border: "1.5px solid #d33fff", borderRadius: 20, padding: "4px 12px", cursor: "pointer" }}>
                    <input type="checkbox" checked={newCategory.variaciones.includes(v)} onChange={() => handleToggleVariacion(v)} style={{ accentColor: "#d33fff" }} />
                    {v}
                  </label>
                ))}
              </div>
              <button type="submit" style={{ width: "100%", background: "#d33fff", color: "#fff", fontWeight: 700, fontSize: 18, border: "none", borderRadius: 20, padding: "10px 0", marginTop: 10 }}>GUARDAR</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MProducto;