// src/pages/Inicio.js
import React from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
  return (
    <div>
      <h1>Bienvenido al consultorio de la Dra. Rosmarian Castillo</h1>
      <p>Seleccione una opción del menú para continuar.</p>
      <nav>
        <ul>
          <li><Link to="/registro-paciente">Registrar Paciente</Link></li>
          <li><Link to="/reservar-cita">Reservar Cita</Link></li>
          <li><Link to="/solicitar-presupuesto">Solicitar Presupuesto</Link></li>
          <li><Link to="/precios">Precios</Link></li>
          <li><Link to="/medios-de-pago">Medios de Pago</Link></li>
          <li><Link to="/sugerencias-reclamos">Sugerencias y Reclamos</Link></li>
          <li><Link to="/historia-medica">Historia Médica</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Inicio;
