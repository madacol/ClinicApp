// src/pages/SugerenciasReclamos.js
import React, { useState } from 'react';

const SugerenciasReclamos = () => {
  const [formData, setFormData] = useState({
    tipo: 'reclamo',
    mensaje: ''
  });
  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.mensaje.trim() === '') {
      alert("Por favor, escriba un mensaje");
      return;
    }
    // Aquí enviarías los datos a la API
    setMensajeEnviado(true);
    setFormData({ tipo: 'reclamo', mensaje: '' });
    setTimeout(() => setMensajeEnviado(false), 3000);
  };

  return (
    <div>
      <h1>Sugerencias, Reclamos o Felicitaciones</h1>
      <p>Déjenos su comentario sobre su experiencia con nuestro servicio.</p>
      <form onSubmit={handleSubmit}>
        <label>Tipo de comentario:</label>
        <select name="tipo" value={formData.tipo} onChange={handleChange}>
          <option value="reclamo">Reclamo</option>
          <option value="sugerencia">Sugerencia</option>
          <option value="Otro comentario">Otro comentario</option>
          <option value="felicitacion">Felicitación</option>
        </select>
        <label>Mensaje:</label>
        <textarea
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          placeholder="Escriba su mensaje..."
          required
        ></textarea>
        <button type="submit">Enviar</button>
      </form>
      {mensajeEnviado && <p style={{ color: 'green' }}>Mensaje enviado con éxito.</p>}
    </div>
  );
};

export default SugerenciasReclamos;
