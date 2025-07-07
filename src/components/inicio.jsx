import React, { useState, useEffect } from 'react';
import '../css/cont_home.css';

import clienteIcon from '../data-icono/cont_home_icono/Clientes.png';
import productoIcon from '../data-icono/cont_home_icono/producto_ventas.png';
import ventasIcon from '../data-icono/cont_home_icono/ventas.png';
import perfilUsuario from '../data-icono/usuario/Usuario1.png';
import AddProductForm from './AddProductForm';
import CategoryForm from './CategoryForm';

const Inicio = ({ cargarContenido }) => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);

  const COMPANIA_ID = "c8faa65e-1343-46e4-b0de-fe3b3a82d709";
  const CATEGORIA_API_URL = `https://nova-inventario-api.infor-business.com/inventario/1.0/${COMPANIA_ID}/Categoria`;

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://aadministracion.infor-business.com/api/1.0/Usuario', {
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    // Fetch company data
    const fetchCompany = async () => {
      try {
        const response = await fetch('https://aadministracion.infor-business.com/api/1.0/Compania', {
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        setCompany(data);
      } catch (error) {
        console.error('Error fetching company:', error);
      }
    };

    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await fetch(CATEGORIA_API_URL, {
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchUser();
    fetchCompany();
    fetchCategories();
  }, []);

  return (
    <div id="contenidos">
      <div className="iconoNombre">
        <div>
          <h4>{company?.razonSocial || 'Nombre del negocio'}</h4>
          <h4>{company?.tipoNegocio?.nombre || 'Categoria del negocio'}</h4>
        </div>
        <div className="usuarioIcono">
          <button onClick={() => cargarContenido('perfil')}>
            <img src={perfilUsuario} alt="icono de usuario" className="imIcon" />
          </button>
        </div>
      </div>

      <div className="fondo">
        <h2>Gestión y Facturación sin Limites Ideal para tu negocio Exacta-App</h2>
        <div className="cont">
          <button className="cont_producto" onClick={() => setShowProductForm(true)}>
            <h3>Regista Nuevo Producto</h3>
            <img className="imgproduct" src={productoIcon} alt="Registrar Producto" />
          </button>
          <button className="cont_miembros" onClick={() => cargarContenido('aggClientes')}>
            <h3>Registra un nuevo clientes</h3>
            <img src={clienteIcon} alt="Clientes" />
          </button>
          <button className="cont_agg_producto" onClick={() => cargarContenido('aggClienstes')}>
            <h3>Haz una nueva venta</h3>
            <img src={ventasIcon} alt="Venta" />
          </button>
        </div>
      </div>

      <div className="fondo">
        <h2>Videos tutorial</h2>
        <div className="cont">
          {[1, 2, 3, 4].map((v) => (
            <button key={v} className="cont_producto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <i className="bi bi-play-circle" style={{ fontSize: '48px', color: '#6a1b9a', marginBottom: '10px' }}></i>
              <span style={{ fontSize: '16px', fontWeight: 600, color: '#333', marginBottom: '5px' }}>xxxxxxxx</span>
            </button>
          ))}
        </div>
      </div>

      {/* Floating Forms */}
      {showProductForm && (
        <AddProductForm
          categories={categories}
          onClose={() => setShowProductForm(false)}
          onOpenCategoryForm={() => setShowCategoryForm(true)}
        />
      )}
      {showCategoryForm && (
        <CategoryForm
          categories={categories}
          setCategories={setCategories}
          onClose={() => setShowCategoryForm(false)}
        />
      )}
    </div>
  );
};

export default Inicio;