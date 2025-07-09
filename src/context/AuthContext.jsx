import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Leer usuario y companyId de localStorage al iniciar
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [companyId, setCompanyId] = useState(localStorage.getItem('companyId') || null);

  // Sincronizar user y companyId con localStorage cuando cambian
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    if (companyId) {
      localStorage.setItem('companyId', companyId);
    } else {
      localStorage.removeItem('companyId');
    }
  }, [companyId]);

  const login = async (username, password) => {
    try {
      console.log('Iniciando login con:', { username, password });

      const response = await fetch('https://nova-pos-api.infor-business.com/POS/1.0/Compania', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        console.error('Error en la API:', response.status, response.statusText);
        return false;
      }

      const data = await response.json();
      console.log('Respuesta de la API:', data);

      // Extraer el array de compañías desde data.data
      const companies = data.data || [];
      if (!Array.isArray(companies)) {
        console.error('Formato de datos inesperado:', companies);
        return false;
      }

      // Buscar compañía
      const company = companies.find(
        (comp) => {
          const match = comp.identificacion === username && comp.id === password;
          console.log('Comparando:', { 
            apiIdentificacion: comp.identificacion, 
            inputUsername: username, 
            apiId: comp.id, 
            inputPassword: password, 
            match 
          });
          return match;
        }
      );

      if (company) {
        const userData = { username: company.identificacion, razonSocial: company.razonSocial };
        setUser(userData);
        setCompanyId(company.id);
        // Guardar en localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('companyId', company.id);
        console.log('Login exitoso:', { username, companyId: company.id });
        return true;
      } else {
        console.log('Compañía no encontrada para:', { username, password });
        return false;
      }
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setCompanyId(null);
    localStorage.removeItem('user');
    localStorage.removeItem('companyId');
  };

  return (
    <AuthContext.Provider value={{ user, companyId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);