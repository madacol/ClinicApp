// src/pages/SolicitarPresupuesto.js
import React, { useState } from 'react';

const SolicitarPresupuesto = () => {
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí enviarías los datos a la API para solicitar el presupuesto
    alert('Presupuesto solicitado');
    setMensaje('Su solicitud de presupuesto ha sido enviada');
  };

  return (
    <div>
      <h1>Solicitar Presupuesto</h1>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input type="text" name="nombre" required />

        <label>Correo:</label>
        <input type="email" name="correo" required />

        <label>Servicio solicitado:</label>
        <input type="text" name="servicio" required />

        <label>Descripción:</label>
        <textarea name="descripcion" required></textarea>

        <button type="submit">Enviar Solicitud</button>
      </form>
    </div>
  );
};

export default SolicitarPresupuesto;
