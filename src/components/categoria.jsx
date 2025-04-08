import React, { useState, useEffect } from "react";
import { updateCategoria } from "./api/updateCategoria"; 

const Categoria = () => {
  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const categoriaId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

  // Obtener la categoría desde la API
  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const response = await fetch(
          `https://aadministracion.infor-business.com/api/1.0/Categoria/${categoriaId}`
        );
        if (!response.ok) throw new Error("Error al obtener la categoría");

        const data = await response.json();
        setCategoria(data);
      } catch (error) {
        console.error(error);
        setMessage("No se pudo cargar la categoría");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoria();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCategoria((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Actualizar la categoría en la API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!categoria) {
      setMessage("No hay datos para actualizar.");
      setLoading(false);
      return;
    }

    const result = await updateCategoria(categoria);
    setMessage(result.message);
    setLoading(false);
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Editar Categoría</h2>
      {categoria ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            Nombre:
            <input
              type="text"
              name="nombre"
              value={categoria.nombre}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </label>

          <label className="block">
            Orden:
            <input
              type="number"
              name="orden"
              value={categoria.orden}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </label>

          <label className="block">
            Aplicación:
            <input
              type="text"
              name="app"
              value={categoria.app}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="enabled"
              checked={categoria.enabled}
              onChange={handleChange}
              className="mr-2"
            />
            Habilitado
          </label>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Actualizando..." : "Actualizar"}
          </button>
        </form>
      ) : (
        <p>No se pudo cargar la categoría.</p>
      )}

      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default Categoria;
