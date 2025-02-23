// src/pages/SeleccionServicio.js
import React from 'react';

const SeleccionServicio = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Servicio seleccionado');
    // Aquí puedes redirigir a la siguiente página o enviar el servicio seleccionado a la API
  };

  return (
    <div>
      <h1>Seleccionar Servicio</h1>
      <form onSubmit={handleSubmit}>
        <label>Seleccione el servicio:</label>
        <select name="servicio">
          <option value="consulta">Consulta</option>
          <option value="procedimientos">Procedimientos</option>
          <option value="examenes">Exámenes de laboratorio</option>
          <option value="consulta_via_internet">Consulta vía internet</option>
        </select>
        <button type="submit">Siguiente</button>
      </form>
    </div>
  );
};

export default SeleccionServicio;
