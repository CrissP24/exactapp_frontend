import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import '../../css/usuario_estilo/estilo_perfil.css';
import Actualizarperfil from '../../data-icono/usuario/Actualizar tu Perfil.png';

const countryOptions = [
  { value: '+1', label: '🇺🇸 USA (+1)' },
  { value: '+52', label: '🇲🇽 México (+52)' },
  { value: '+593', label: '🇪🇨 Ecuador (+593)' }
];

function PerfilActualizar() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_URL = 'https://aadministracion.infor-business.com/api/1.0/Usuario';
  const USER_ID = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

  // Fetch user data with GET
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/${USER_ID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}` // Uncomment and add token if needed
          }
        });

        if (!response.ok) throw new Error('Error al obtener los datos del usuario');
        
        const result = await response.json();
        setProfile(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneCodeChange = (selectedOption) => {
    setProfile(prev => ({
      ...prev,
      phoneNumber: selectedOption ? `${selectedOption.value} ` : ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(''); // Clear previous success message
    setError('');   // Clear previous error message
    try {
      const response = await fetch(`${API_URL}/${USER_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}` // Uncomment and add token if needed
        },
        body: JSON.stringify(profile)
      });

      if (!response.ok) throw new Error('Error al guardar los cambios');

      setSuccess('¡Cambios guardados correctamente!');
      // Clear the success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('No se pudo guardar: ' + error.message);
    }
  };

  return (
    <div className="profile-container">
      <h2>Actualizar Perfil</h2>
      <img src={Actualizarperfil} alt="Actualizar Perfil" className="profile-image" />

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      {loading ? (
        <p>Cargando...</p>
      ) : profile ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre de Usuario:</label>
            <input
              type="text"
              name="userName"
              value={profile.userName || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={profile.name || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Apellido:</label>
            <input
              type="text"
              name="lastName"
              value={profile.lastName || ''}
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
                value={countryOptions.find(option =>
                  profile.phoneNumber?.startsWith(option.value)
                )}
                placeholder="+"
                classNamePrefix="react-select"
              />
            </div>

            <div className="form-group">
              <label>Número de Teléfono:</label>
              <input
                type="tel"
                name="phoneNumber"
                value={profile.phoneNumber || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit">Guardar Cambios</button>
        </form>
      ) : (
        <p>No se encontraron datos de perfil.</p>
      )}
    </div>
  );
}

export default PerfilActualizar;