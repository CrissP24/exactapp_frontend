import React from 'react';
import { useNavigate } from 'react-router-dom';
import './offers.css'; // asegúrate de que exista
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png';

const Offers = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-between py-4">
      {/* Encabezado */}
      <div className="container container-box mb-4">
        <div className="row align-items-center justify-content-between flex-wrap">
          {/* Logo */}
          <div className="col-md-4 d-flex align-items-center mb-2 mb-md-0">
            <img src={logo} alt="Logo" style={{ width: '70px', marginRight: '10px' }} />
            <span className="logo-text">&lt; Exact-App &gt;</span>
          </div>

          {/* Botones centrales */}
          <div className="col-md-4 d-flex flex-column align-items-center gap-2">
            <button className="btn-header-round" onClick={() => navigate('/')}>
              Lo que ofrecemos
            </button>
            <button className="btn-header-round" onClick={() => navigate('/business-types')}>
              Tipos de negocio
            </button>
          </div>

          {/* Botón Ingresar */}
          <div className="col-md-4 text-md-end text-center mt-3 mt-md-0">
            <button className="btn-ingresar-strong" onClick={() => navigate('/login')}>
              Ingresar a <span>&lt; Exact-App &gt;</span><br />
              <span className="ingresar-web-text">WEB</span>
            </button>
          </div>
        </div>
      </div>

    {/* Contenido principal */}
    <div className="container mb-4">
        <div className="row justify-content-center g-4">
          <div className="col-12">
            <div className="main-section-box">
              <div className="row justify-content-between align-items-center">
                <div className="col-auto">
                  <button className="section-button">Gestión de compras y ventas</button>
                </div>
                <div className="col-auto">
                  <button className="section-button">Existencias de productos</button>
                </div>
                <div className="col-auto">
                  <div className="stats-box">xxxxxxxx</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Pie de página */}
      <div className="text-center">
        <div className="additional-note">propagandas, pendiente pantalla principal</div>
      </div>

      {/* Botón flotante */}
      <button className="exactita-button">Exactita</button>
    </div>
  );
};

export default Offers;
