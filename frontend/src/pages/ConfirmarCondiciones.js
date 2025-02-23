// src/pages/ConfirmarCondiciones.js
import React from 'react';

const ConfirmarCondiciones = () => {
  const handleAceptar = () => {
    // Aquí puedes redirigir a la siguiente página o ejecutar lógica adicional
    alert('Condiciones aceptadas');
  };

  const handleNoAceptar = () => {
    alert('Debe aceptar las condiciones para continuar');
  };

  return (
    <div>
      <h1>Confirmación de Condiciones</h1>
      <p>Por favor, lea y acepte las siguientes condiciones para continuar con la reserva de su cita:</p>
      <ul>
        <li>Debe presentarse con el documento de identidad.</li>
        <li>La reserva no es reembolsable en caso de inasistencia.</li>
        <li>Se requiere cancelación con al menos 24 horas de antelación.</li>
        {/* Agrega más condiciones según sea necesario */}
      </ul>
      <button onClick={handleAceptar}>Aceptar</button>
      <button onClick={handleNoAceptar}>No Aceptar</button>
    </div>
  );
};

export default ConfirmarCondiciones;
