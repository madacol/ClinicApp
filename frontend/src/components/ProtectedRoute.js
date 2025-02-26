import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Componente para proteger rutas que requieren autenticación
const ProtectedRoute = ({ roles }) => {
  const { isAuthenticated, hasRole, loading } = useAuth();

  // Mostrar un indicador de carga mientras se verifica la autenticación
  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  // Si el usuario no está autenticado, redirigir al login
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Si se especifican roles y el usuario no tiene uno de esos roles, redirigir a una página de acceso denegado
  if (roles && !hasRole(roles)) {
    return <Navigate to="/acceso-denegado" replace />;
  }

  // Si el usuario está autenticado y tiene los roles requeridos (o no se requieren roles), renderizar el componente hijo
  return <Outlet />;
};

export default ProtectedRoute;