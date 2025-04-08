import React, { useState } from 'react';

const CategoryForm = ({ categories, setCategories, onClose }) => {
  const [newCategory, setNewCategory] = useState({
    nombre: "",
    orden: 0,
    app: "Exact-App",
    enabled: true,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      [name]: name === "orden" ? parseInt(value) : value,
    }));
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const payload = {
        id: "", // Let the backend generate the ID
        nombre: newCategory.nombre,
        orden: newCategory.orden || categories.length + 1, // Use provided orden or auto-increment
        app: "Exact-App", // Consistent with the application
        enabled: true,
      };

      console.log("Payload being sent to category API:", payload); // Debug log

      const response = await fetch("https://aadministracion.infor-business.com/api/1.0/Categoria", {
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
      console.log("Response from category API:", result); // Debug log

      setCategories((prev) => [...prev, result.data]);
      setNewCategory({
        nombre: "",
        orden: 0,
        app: "Exact-App",
        enabled: true,
      });
      setSuccess("Categoría agregada correctamente");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error adding category:", error); // Debug log
      setError(error.message);
    }
  };

  return (
    <div className="floating-form">
      <div className="form-content">
        <h3>Categorías</h3>
        <button className="close-btn" onClick={onClose}>X</button>
        <div>
          <input
            type="text"
            placeholder="Buscar Categorías"
          />
        </div>
        <div>
          <label>Nombre de la Categoría</label>
          <input
            type="text"
            placeholder="Agregar Categoría"
            name="nombre"
            value={newCategory.nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Orden</label>
          <input
            type="number"
            name="orden"
            value={newCategory.orden}
            onChange={handleChange}
            placeholder="Orden (opcional)"
          />
        </div>
        <div>
          <button onClick={handleAddCategory}>Agregar Categoría</button>
        </div>
        <div>
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
  );
};

export default CategoryForm;