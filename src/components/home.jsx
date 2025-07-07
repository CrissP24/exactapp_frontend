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
import exactaAppLogo from "../data-icono/LogoEA.png";


// Carga diferida de los componentes
const ContenidoHome = lazy(() => import("./contenido_home.jsx"));
const PerfilActualizacion = lazy(() => import("./usuario/perfil_actulalizacion.jsx"));
const ClienteM = lazy(() => import("./Menu/Clientes.jsx"));
const ComprasM = lazy(() => import("./Menu/Compras.jsx"));
const ConfiguracionM = lazy(() => import("./Menu/Configuracion.jsx"));
const InventarioM = lazy(() => import("./Menu/Inventarios.jsx"));
const ProductoM = lazy(() => import("./Menu/Productos.jsx"));
const ProveedorM = lazy(() => import("./Menu/Proveedor.jsx"));
const ReportesM = lazy(() => import("./Menu/Reportes.jsx"));
const VentasM = lazy(() => import("./Menu/Ventas.jsx"));
const AggClientesP = lazy(() => import("./contenido_de_home/nueva_venta.jsx"));
const VCarrito = lazy(() => import("./Menu/VentasCarrito.jsx"));

// Sidebar componente

const Sidebar = ({ cargarContenido }) => {
  const [activo, setActivo] = useState("InicioMenu");

  const menuItems = [
    { image: inicioIcon, text: "Inicio", endpoint: "InicioMenu" },
    { image: productosIcon, text: "Productos", endpoint: "ProductosMenu" },
    { image: ventasIcon, text: "Ventas", endpoint: "VentasMenu" },
    { image: clienteIcon, text: "Clientes", endpoint: "ClientesMenu" },
    { image: comprasIcon, text: "Compras", endpoint: "ComprasMenu" },
    { image: proveedorIcon, text: "Proveedor", endpoint: "ProveedorMenu" },
    { image: reportesIcon, text: "Reportes", endpoint: "ReportesMenu" },
    { image: inventarioIcon, text: "Inventario", endpoint: "InventarioMenu" },
    { image: configuracionIcon, text: "Configuración", endpoint: "ConfiguracionMenu" },
  ];

  const handleClick = (endpoint) => {
    setActivo(endpoint);
    cargarContenido(endpoint);
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={exactaAppLogo} alt="Logo ExactApp" className="logo" />
        <h3 className="nombre-app">&lt; Exact-App &gt;</h3>
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

// Home componente
const Home = () => {
  const [contenidoActual, setContenidoActual] = useState("InicioMenu");

  // Diccionario de componentes
  const componentes = {
    perfil: <PerfilActualizacion />,
    inicio: <ContenidoHome cargarContenido={setContenidoActual} />, // Asegura que inicio cargue ContenidoHome
    InicioMenu: <ContenidoHome cargarContenido={setContenidoActual} />, // Ahora InicioMenu carga el Home
    ProductosMenu: <ProductoM />,
    VentasMenu: <VentasM />,
    ClientesMenu: <ClienteM />,
    ComprasMenu: <ComprasM />,
    ProveedorMenu: <ProveedorM />,
    ReportesMenu: <ReportesM />,
    InventarioMenu: <InventarioM />, 
    ConfiguracionMenu: <ConfiguracionM />,
    aggClientes: <AggClientesP />,
    VentasCarrito:<VCarrito />,

  };

  return (
    <div className="app-container">
      <Sidebar cargarContenido={setContenidoActual} />
      <Suspense fallback={<div>Cargando...</div>}>
        <div className="contenido">{componentes[contenidoActual] || <div>Seleccione una opción</div>}</div>
      </Suspense>
    </div>
  );
};

export default Home;