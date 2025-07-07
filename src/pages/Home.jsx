import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png'; // // Asegúrate de tener tu logo aquí

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-between py-4">
      {/* Encabezado */}
      <div className="container container-box mb-4">
  <div className="row align-items-center justify-content-between flex-wrap">
    {/* Logo y texto */}
    <div className="col-md-4 d-flex align-items-center mb-2 mb-md-0">
      <img src={logo} alt="Logo" style={{ width: '70px', marginRight: '10px' }} />
      <span className="logo-text">&lt; Exact-App &gt;</span>
    </div>

    {/* Botones centrales redondos */}
    <div className="col-md-4 d-flex flex-column align-items-center gap-2">
      <button className="btn-header-round" onClick={() => navigate('/offers')}>Lo que ofrecemos</button>
      <button className="btn-header-round" onClick={() => navigate('/business-types')}>Tipos de negocio</button>
    </div>

    {/* Botón Ingresar */}
    <div className="col-md-4 text-md-end text-center mt-3 mt-md-0">
      <button className="btn-ingresar-strong" onClick={() => navigate('/login')}>
        Ingresar a <span>&lt; Exact-App &gt;</span> <br />
        <span className="ingresar-web-text">WEB</span>
      </button>
    </div>
  </div>
</div>


      {/* Título */}
      <h2 className="title-main">Gestión y Facturación sin Límites</h2>

      {/* Tarjetas */}
      <div className="container mb-4">
        <div className="row justify-content-center g-3">
          {[...Array(4)].map((_, idx) => (
            <div className="col-6 col-md-3" key={idx}>
              <div className="card-custom">
                <div style={{ fontSize: '30px', color: '#6a1b9a' }}>🎬</div>
                <div className="mt-2">xxxxxx</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Propaganda */}
      <div className="text-center mb-5">
        <div className="additional-note">
          propagandas, pendiente pantalla principal
        </div>
      </div>

      {/* Botón flotante */}
      <button className="exactita-button">Exactita</button>
    </div>
  );
};

export default Home;
