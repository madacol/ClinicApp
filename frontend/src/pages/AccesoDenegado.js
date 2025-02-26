import React from 'react';
import { Link } from 'react-router-dom';

const AccesoDenegado = () => {
  return (
    <div className="acceso-denegado">
      <h1>Acceso Denegado</h1>
      <p>Lo sentimos, no tienes permiso para acceder a esta página.</p>
      <Link to="/" className="btn-primary">
        Volver al inicio
      </Link>
    </div>
  );
};

export default AccesoDenegado;