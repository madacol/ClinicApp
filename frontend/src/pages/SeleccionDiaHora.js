// src/pages/SeleccionDiaHora.js
import React from 'react';

const SeleccionDiaHora = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Día y hora seleccionados');
    // Aquí puedes enviar los datos seleccionados a la API o redirigir a la siguiente página
  };

  return (
    <div>
      <h1>Seleccionar Día y Hora</h1>
      <form onSubmit={handleSubmit}>
        <label>Fecha:</label>
        <input type="date" name="fecha" required />

        <label>Ubicación:</label>
        <select name="centro">
          <option value="Consultorio Dra. Rosmarian Castillo">Consultorio Dra. Rosmarian Castillo</option>
          {/* Agregar más centros si es necesario */}
        </select>

        <label>Horario:</label>
        <select name="horario">
          <option value="todos">Todos</option>
          <option value="personalizado">Personalizado</option>
        </select>

        {/* Aquí se podrían mostrar horarios disponibles en base a filtros */}
        <button type="submit">Seleccionar Hora</button>
      </form>
    </div>
  );
};

export default SeleccionDiaHora;
