import React, { lazy, Suspense, useState } from "react";
import "../css/estilo_home.css";
import inicioIcon from "../data-icono/inicio.jpg";
import productosIcon from "../data-icono/3. producto ventas.png"; // Assuming you have this icon
import ventasIcon from "../data-icono/2. ventas.png"; // Assuming you have this icon
import clienteIcon from "../data-icono/4. Clientes.png"; // Assuming you have this icon
import comprasIcon from "../data-icono/5. Compras.png";
import proveedorIcon from "../data-icono/7. Provedores.png"; // Assuming you have this icon
import reportesIcon from "../data-icono/9. Reportes.png"; // Assuming you have this icon
import inventarioIcon from "../data-icono/8. Inventario.png"; // Assuming you have this icon
import configuracionIcon from "../data-icono/compras.png"; // Assuming you have this icon
import exactaAppLogo from "../data-icono/LogoEA.PNG";

import settingsIcon from "../assets/images/settings-icon.png";

const Sidebar = ({ cargarContenido }) => {
  const [activo, setActivo] = useState("Home");

  const menuItems = [
    { image: homeIcon, text: "Inicio", endpoint: "Home" },
    { image: productsIcon, text: "Productos", endpoint: "Products" },
    { image: salesIcon, text: "Ventas", endpoint: "Sales" },
    { image: customersIcon, text: "Clientes", endpoint: "Customers" },
    { image: purchasesIcon, text: "Compras", endpoint: "Purchases" },
    { image: suppliersIcon, text: "Proveedores", endpoint: "Suppliers" },
    { image: reportsIcon, text: "Reportes", endpoint: "Reports" },
    { image: inventoryIcon, text: "Inventario", endpoint: "Inventory" },
    { image: settingsIcon, text: "Configuración", endpoint: "Settings" },
  ];

  const handleClick = (endpoint) => {
    setActivo(endpoint);
    cargarContenido(endpoint);
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="Logo ExactApp" className="logo" />
        <h3 className="nombre-app">< Exact-App ></h3>
      </div>
      <nav>
        <ul className="menu-lista">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleClick(item.endpoint)}
              className={`menu-item ${activo === item.endpoint ? "activo" : ""}`}
            >
              <img src={item.image} alt={item.text} className="icono" />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;