import React, { useState, useEffect } from 'react';
import '../css/cont_home.css';

import clienteIcon from '../data-icono/cont_home_icono/Clientes.png';
import productoIcon from '../data-icono/cont_home_icono/producto_ventas.png';
import ventasIcon from '../data-icono/cont_home_icono/ventas.png';
import perfilUsuario from '../data-icono/usuario/Usuario1.png';

import AddProductForm from './AddProductForm';
import CategoryForm from './CategoryForm';

const ContenidoHome = ({ cargarContenido, companyId }) => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!companyId) return;
      try {
        const response = await fetch(`https://nova-pos-api.infor-business.com/POS/1.0/Compania/${companyId}`, {
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        setCompany(data);
      } catch (error) {
        console.error('Error fetching company:', error);
      }
    };

    fetchCompany();
  }, [companyId]);

  return (
    <div className="inicio-container">
      {/* Usuario y nombre de negocio alineados a la derecha */}
      <div className="iconoNombre">
        <div className="infoNegocio">
          <h4>{company?.razonSocial || 'Nombre del Negocio'}</h4>
          <h4>{company?.tipoNegocio?.nombre || 'Categoría del Negocio'}</h4>
        </div>
        <div className="usuarioIcono">
          <button onClick={() => cargarContenido('perfil')}>
            <img src={perfilUsuario} alt="Icono de usuario" className="imIcon" />
          </button>
        </div>
      </div>

      {/* Cuadro principal centrado con fondo blanco y sombra */}
      <div className="main-card" style={{
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        padding: '32px 24px',
        maxWidth: '900px',
        margin: '0 auto 40px auto',
        width: '100%',
      }}>
        <div className="titulo">
          <h2>Gestión y Facturación sin Límites</h2>
          <h3>Ideal para tu negocio: Exacta-App</h3>
        </div>

        <div className="tarjetas-principales">
          <div className="tarjeta gris" onClick={() => setShowProductForm(true)}>
            <p>Registra Nuevo Producto</p>
            <img src={productoIcon} alt="Registrar Producto" />
          </div>

          <div className="tarjeta naranja" onClick={() => cargarContenido('aggClientes')}>
            <p>Registra Nuevo Cliente</p>
            <img src={clienteIcon} alt="Clientes" />
          </div>

          <div className="tarjeta verde" onClick={() => cargarContenido('Ventas')}>
            <p>Haz una Nueva Venta</p>
            <img src={ventasIcon} alt="Venta" />
          </div>
        </div>
      </div>

      {/* Sección de videos centrada */}
      <div className="videos-section">
        <h4>Videos Tutorial</h4>
        <div className="videos-container">
          {[1, 2, 3, 4].map((v) => (
            <div className="video-tarjeta" key={v}>
              <div className="icono-play">▶️</div>
              <p>Tutorial {v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Formularios flotantes */}
      {showProductForm && (
        <div className="overlay">
          <AddProductForm
            categories={categories}
            onClose={() => setShowProductForm(false)}
            onOpenCategoryForm={() => setShowCategoryForm(true)}
          />
        </div>
      )}

      {showCategoryForm && (
        <div className="overlay">
          <CategoryForm
            categories={categories}
            setCategories={setCategories}
            onClose={() => setShowCategoryForm(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ContenidoHome;
