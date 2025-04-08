import React, { useState } from "react";
import "../../css/ch_ventas/H_agg_clientes.css";

const NuevaVenta = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    tipoIdentificacion: "ruc",
    identificacion: "",
    correo: "",
    celular: "",
    direccion: "",
    tipoCliente: "minorista",
  });

  const [mensajeExito, setMensajeExito] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (!formData.correo.includes("@")) {
        alert("Ingrese un correo válido.");
        return;
      }

      if (!/^\d{10}$/.test(formData.celular)) {
        alert("Ingrese un número de celular válido (10 dígitos).");
        return;
      }

      if (formData.tipoIdentificacion === "ruc") {
        if (!/^\d{13}$/.test(formData.identificacion) || !formData.identificacion.endsWith("001")) {
          alert("El RUC debe tener 13 dígitos y terminar en '001'.");
          return;
        }
      } else if (formData.tipoIdentificacion === "cedula") {
        if (!/^\d{10}$/.test(formData.identificacion)) {
          alert("La cédula debe tener exactamente 10 dígitos numéricos.");
          return;
        }
      } else if (formData.tipoIdentificacion === "pasaporte") {
        if (!/^[a-zA-Z0-9]{10}$/.test(formData.identificacion)) {
          alert("El pasaporte debe contener exactamente 10 caracteres alfanuméricos.");
          return;
        }
      }

      console.log(formData);

      // Mostrar mensaje de éxito
      setMensajeExito(true);

      // Ocultar mensaje después de 3 segundos
      setTimeout(() => setMensajeExito(false), 3000);

      // Reiniciar el formulario
      setFormData({
        nombre: "",
        tipoIdentificacion: "ruc",
        identificacion: "",
        correo: "",
        celular: "",
        direccion: "",
        tipoCliente: "minorista",
      });

    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="form-container">
      {mensajeExito && (
        <div className="mensaje-exito">
          ✅✅ ¡Listo! Su nuevo cliente se ha guardado con éxito.
        </div>
      )}

      <h2>Agregar Cliente ✗</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <div className="form-group radio-group">
          <label>Tipo de Identificación:</label>
          {["ruc", "cedula", "pasaporte"].map((tipo) => (
            <label key={tipo}>
              <input
                type="radio"
                name="tipoIdentificacion"
                value={tipo}
                checked={formData.tipoIdentificacion === tipo}
                onChange={handleChange}
              />
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </label>
          ))}
        </div>

        <div className="form-group">
          <label>Número de Identificación:</label>
          <input
            type="text"
            name="identificacion"
            value={formData.identificacion}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label>Número de Celular:</label>
          <div className="phone-input">
            <span>+593</span>
            <input
              type="tel"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <div className="form-group radio-group">
          <label>Tipo de Cliente:</label>
          {["minorista", "mayorista"].map((tipo) => (
            <label key={tipo}>
              <input
                type="radio"
                name="tipoCliente"
                value={tipo}
                checked={formData.tipoCliente === tipo}
                onChange={handleChange}
              />
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </label>
          ))}
        </div>

        <button type="submit" className="submit-btn">
          Guardar
        </button>
      </form>

     
    </div>
  );
};

export default NuevaVenta;
