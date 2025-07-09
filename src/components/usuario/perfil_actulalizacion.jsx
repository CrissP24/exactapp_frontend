import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx'; // Importar el contexto
import Select from 'react-select';
import '../../css/usuario_estilo/estilo_perfil.css';
import Actualizarperfil from '../../data-icono/usuario/Actualizar tu Perfil.png';

const countryOptions = [
  { value: '+1', label: '🇺🇸 USA (+1)' },
  { value: '+52', label: '🇲🇽 México (+52)' },
  { value: '+593', label: '🇪🇨 Ecuador (+593)' },
];

function PerfilActualizar({ cargarContenido }) {
  const { companyId } = useAuth(); // Obtener companyId del contexto
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_URL = `https://nova-pos-api.infor-business.com/POS/1.0/Compania`;

  // Fetch company data with GET
  useEffect(() => {
    const fetchProfile = async () => {
      if (!companyId) {
        setError('No se proporcionó ID de compañía');
        return;
      }
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/${companyId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}` // Descomentar si se necesita token
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos de la compañía');
        }

        const result = await response.json();
        console.log('Datos de la compañía:', result); // Depuración
        setProfile(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [companyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneCodeChange = (selectedOption) => {
    setProfile((prev) => ({
      ...prev,
      telefono: selectedOption ? `${selectedOption.value} ${prev.telefono?.split(' ')[1] || ''}` : '',
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          logo: reader.result,
          extensionLogo: `.${file.name.split('.').pop()}`,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    cargarContenido('inicio'); // Regresa a la pantalla principal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      // Crear objeto con los campos originales y actualizar solo los modificados
      const updatedProfile = {
        id: profile.id,
        identificacion: profile.identificacion,
        razonSocial: profile.razonSocial,
        nombreComercial: profile.nombreComercial,
        direccionMatriz: profile.direccionMatriz,
        abreviatura: profile.abreviatura,
        ambiente: profile.ambiente,
        tipoEmision: profile.tipoEmision,
        contribuyenteEspecial: profile.contribuyenteEspecial,
        codigoContribuyenteEspecial: profile.codigoContribuyenteEspecial,
        telefono: profile.telefono,
        email: profile.email || null,
        logo: profile.logo,
        extensionLogo: profile.extensionLogo,
        obligado: profile.obligado,
        facturacionElectronica: profile.facturacionElectronica,
        codigoSeguridadXML: profile.codigoSeguridadXML,
        contribuyenteRimpe: profile.contribuyenteRimpe,
        agenteRetencion: profile.agenteRetencion,
        logoBase: profile.logoBase,
        deleted: profile.deleted,
      };

      const response = await fetch(`${API_URL}/${companyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}` // Descomentar si se necesita token
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) {
        throw new Error('Error al guardar los cambios');
      }

      setSuccess('¡Cambios guardados correctamente!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('No se pudo guardar: ' + error.message);
    }
  };

  return (
    <div className="profile-container">
      <h2>Actualizar Compañía</h2>
      <span className="close-button" onClick={handleClose}>
        X
      </span>
      <img src={Actualizarperfil} alt="Actualizar Perfil" className="profile-image" />

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      {loading ? (
        <p>Cargando...</p>
      ) : profile ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>RUC (Identificación):</label>
            <input
              type="text"
              name="identificacion"
              value={profile.identificacion || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Nombre Comercial:</label>
            <input
              type="text"
              name="nombreComercial"
              value={profile.nombreComercial || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Dirección Matriz:</label>
            <input
              type="text"
              name="direccionMatriz"
              value={profile.direccionMatriz || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={profile.email || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Código de País:</label>
              <Select
                options={countryOptions}
                onChange={handlePhoneCodeChange}
                value={countryOptions.find((option) =>
                  profile.telefono?.startsWith(option.value)
                )}
                placeholder="+"
                classNamePrefix="react-select"
              />
            </div>

            <div className="form-group">
              <label>Número de Celular:</label>
              <input
                type="tel"
                name="telefono"
                value={profile.telefono || ''}
                onChange={handleChange}
            />
            </div>
          </div>

          <div className="form-group">
            <label>Categoría de Negocio:</label>
            <input
              type="text"
              name="categoriaDeNegocio"
              value={profile.categoriaDeNegocio || 'No tiene'}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Logo Actual:</label>
            {profile.logo && <img src={profile.logo} alt="Logo actual" style={{ maxWidth: '200px', marginTop: '10px' }} />}
          </div>

          <div className="form-group">
            <label>Subir Nuevo Logo:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
            />
          </div>

          <button type="submit">Actualizar</button>
        </form>
      ) : (
        <p>No se encontraron datos de la compañía.</p>
      )}
    </div>
  );
}

export default PerfilActualizar;