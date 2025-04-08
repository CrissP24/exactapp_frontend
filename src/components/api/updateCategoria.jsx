export const updateCategoria = async (categoria) => {
  const url = `https://aadministracion.infor-business.com/api/1.0/Categoria/${categoria.id}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoria),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar la categoría");
    }

    return { success: true, message: "Categoría actualizada correctamente" };
  } catch (error) {
    console.error("Error en updateCategoria:", error);
    return { success: false, message: error.message };
  }
};
