import React, { useState, useEffect } from "react";
import "../../css/MenuCss/EstiloProducto.css";
import AddProductForm from "../AddProductForm.jsx";

const initialProduct = {
  nombre: "",
  categoria: "",
  descripcion: "",
  codigo: "",
  costo: "",
  precio: "",
  cantidad: "",
  moneda: "USD",
  imagen: null,
};

const initialCategory = {
  nombre: "",
};

const MProducto = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Cargar productos y categorías de localStorage al iniciar
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("appData")) || {};
    const storedProducts = storedData.productos || [];
    let storedCategories = storedData.categorias || [];
    
    if (!storedCategories || storedCategories.length === 0) {
      storedCategories = [
        { id: "1", nombre: "Electrónica", variaciones: ["Tamaño", "Color"] },
        { id: "2", nombre: "Ropa", variaciones: ["Tamaño", "Color"] },
        { id: "3", nombre: "Alimentos", variaciones: ["Peso"] },
        { id: "4", nombre: "Bebidas", variaciones: ["Capacidad"] },
        { id: "5", nombre: "Papelería", variaciones: [] },
      ];
    }
    
    setProducts(storedProducts);
    setCategories(storedCategories);
    
    // Guardar categorías iniciales si no existían
    localStorage.setItem("appData", JSON.stringify({
      ...storedData,
      productos: storedProducts,
      categorias: storedCategories,
    }));
  }, []);

  // Guardar productos y categorías en localStorage cuando cambian
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("appData")) || {};
    localStorage.setItem("appData", JSON.stringify({
      ...storedData,
      productos: products,
      categorias: categories,
    }));
  }, [products, categories]);

  const handleAddProduct = (product) => {
    setProducts([
      ...products,
      { ...product, id: Date.now().toString() },
    ]);
    setShowAddModal(false);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setProducts(products.filter((p) => p.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const getCategory = (id) => categories.find((c) => c.id === id)?.nombre || "-";

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
        <button className="add-product-button" onClick={() => setShowAddModal(true)} style={{ float: "right", marginBottom: 10, background: "#d8b4e2", color: "#6a1b9a", fontWeight: 700, fontSize: 18, border: "2px solid #d33fff", borderRadius: 20, padding: "8px 24px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 24, marginRight: 5 }}>＋</span> NUEVO PRODUCTO
        </button>
        <table className="product-table" style={{ border: "2px solid #d33fff", borderRadius: 10, width: "100%", marginTop: 30 }}>
          <thead>
            <tr>
              <th>PRODUCTO</th>
              <th>CATEGORÍA</th>
              <th>CANTIDAD</th>
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
                  {p.imagen && <img src={p.imagen} alt="img" style={{ width: 32, height: 32, objectFit: "cover", borderRadius: 4, marginRight: 5 }} />}
                  <span style={{ background: idx === 0 ? "#ffb6e6" : "#b2ffc3", borderRadius: 6, padding: "2px 10px", fontWeight: 600 }}>{p.nombre}</span>
                </td>
                <td>
                  <span style={{ background: idx === 0 ? "#ffb6e6" : "#b2ffc3", borderRadius: 6, padding: "2px 10px", fontWeight: 600 }}>{getCategory(p.categoria)}</span>
                </td>
                <td>
                  <span style={{ background: idx === 0 ? "#ffb6e6" : "#b2ffc3", borderRadius: 6, padding: "2px 10px", fontWeight: 600 }}>{p.cantidad}</span>
                </td>
                <td>
                  <span style={{ background: idx === 0 ? "#ffb6e6" : "#b2ffc3", borderRadius: 6, padding: "2px 10px", fontWeight: 600 }}>{p.moneda}</span>
                </td>
                <td>
                  <span style={{ background: idx === 0 ? "#ffb6e6" : "#b2ffc3", borderRadius: 6, padding: "2px 10px", fontWeight: 600 }}>${Number(p.costo).toFixed(2)}</span>
                </td>
                <td>
                  <span style={{ background: idx === 0 ? "#ffb6e6" : "#b2ffc3", borderRadius: 6, padding: "2px 10px", fontWeight: 600 }}>${Number(p.precio).toFixed(2)}</span>
                </td>
                <td>
                  <button className="delete-button" style={{ fontSize: 28, color: "#6a1b9a", background: "none", border: "none" }} onClick={() => handleDeleteClick(p.id)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
            {Array.from({ length: 6 - products.length }).map((_, i) => (
              <tr key={"empty-" + i}>
                {Array.from({ length: 7 }).map((_, j) => (
                  <td key={j} style={{ background: "#fff", height: 40 }}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddModal && (
        <div className="modal-overlay">
          <AddProductForm
            onClose={() => setShowAddModal(false)}
            onSave={handleAddProduct}
            categories={categories}
            setCategories={setCategories}
          />
        </div>
      )}
      {showDeleteModal && (
        <div className="modal-overlay" style={{ zIndex: 1000 }}>
          <div className="modal" style={{ background: "#f3e5f5", border: "2px solid #d33fff", borderRadius: 20, maxWidth: 400, textAlign: "center", boxShadow: "0 0 20px #d8b4e2" }}>
            <div style={{ fontSize: 80, color: "#6a1b9a", fontWeight: 900, marginBottom: 10 }}>X</div>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>¿Estás seguro de que quieres eliminar este producto?</div>
            <button style={{ background: "#d33fff", color: "#fff", fontWeight: 700, fontSize: 20, border: "none", borderRadius: 10, padding: "10px 40px", marginTop: 10, cursor: "pointer" }} onClick={confirmDelete}>
              ACEPTAR
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MProducto;