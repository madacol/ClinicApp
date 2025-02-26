import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cargar usuario desde localStorage al iniciar la aplicación
    const loadUser = () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (token && savedUser) {
        try {
          setCurrentUser(JSON.parse(savedUser));
          
          // Configurar el header de autorización para todas las solicitudes
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (err) {
          console.error('Error parsing user data', err);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
      
      setLoading(false);
    };
    
    loadUser();
  }, []);

  // Función para iniciar sesión
  const login = async (username, password) => {
    try {
      setError(null);
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      
      const { token, user } = response.data;
      
      // Guardar en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Actualizar el contexto
      setCurrentUser(user);
      
      // Configurar el header de autorización
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return user;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
      throw err;
    }
  };

  // Función para registrar un nuevo usuario
  const register = async (userData) => {
    try {
      setError(null);
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      
      const { token, userId } = response.data;
      const user = {
        id: userId,
        username: userData.username,
        email: userData.email,
        role: 'paciente'
      };
      
      // Guardar en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Actualizar el contexto
      setCurrentUser(user);
      
      // Configurar el header de autorización
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return user;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar usuario');
      throw err;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  // Verificar si un usuario está autenticado
  const isAuthenticated = () => {
    return !!currentUser;
  };

  // Verificar si un usuario tiene un rol específico
  const hasRole = (roles) => {
    if (!currentUser) return false;
    
    if (typeof roles === 'string') {
      return currentUser.role === roles;
    }
    
    return roles.includes(currentUser.role);
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated,
    hasRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para facilitar el uso del contexto
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};