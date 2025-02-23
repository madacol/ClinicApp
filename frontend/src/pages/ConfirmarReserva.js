// src/pages/ConfirmarReserva.js
import React from 'react';

const ConfirmarReserva = () => {
  // En un escenario real, estos datos se obtendrían de la reserva seleccionada.
  const reserva = {
    telefono: "+58 4149653472",
    correo: "paciente@correo.com",
    fecha: "12/03/2025",
    hora: "10:00 AM",
    medico: "Dra. Rosmarian Castillo",
    especialidad: "Oftalmología Adulto",
    lugar: "Consultorio Dra. Rosmarian Castillo"
  };

  const handleConfirmar = () => {
    alert("Reserva confirmada");
    // Aquí puedes redirigir a la página de Cita Confirmada o ejecutar lógica adicional
  };

  return (
    <div>
      <h1>Confirmación de Reserva</h1>
      <p>Verifique los detalles de su cita antes de confirmar:</p>
      <ul>
        <li><strong>Teléfono:</strong> {reserva.telefono}</li>
        <li><strong>Correo:</strong> {reserva.correo}</li>
        <li><strong>Fecha:</strong> {reserva.fecha}</li>
        <li><strong>Hora:</strong> {reserva.hora}</li>
        <li><strong>Médico:</strong> {reserva.medico}</li>
        <li><strong>Especialidad:</strong> {reserva.especialidad}</li>
        <li><strong>Lugar:</strong> {reserva.lugar}</li>
      </ul>
      <button onClick={handleConfirmar}>Confirmar Cita</button>
    </div>
  );
};

export default ConfirmarReserva;
