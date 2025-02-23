// src/pages/BusquedaEspecialidad.js
import React, { useState, useEffect } from 'react';
import { medicos, especialidades, centrosSalud } from '../medicos';

const BusquedaEspecialidad = () => {
  // Estado para la especialidad, centro y dirección
  const [especialidad, setEspecialidad] = useState('Oftalmología Adulto');
  const [centro, setCentro] = useState('Consultorio Dra. Rosmarian Castillo');
  const [direccion, setDireccion] = useState('');
  const [medicosFiltrados, setMedicosFiltrados] = useState([]);

  // Actualiza la lista de médicos filtrados según la especialidad
  useEffect(() => {
    const filtrados = medicos.filter(m => {
      // Algunos médicos pueden tener "especialidad" como string o array
      if (Array.isArray(m.especialidades)) {
        return m.especialidades.includes(especialidad);
      }
      return m.especialidad === especialidad;
    });
    setMedicosFiltrados(filtrados);
  }, [especialidad]);

  // Actualiza la dirección del centro seleccionado basándose en los datos de los médicos
  useEffect(() => {
    // Busca el primer médico que trabaje en el centro seleccionado
    const centerData = medicos.find(m => m.centros.includes(centro));
    if (centerData) {
      setDireccion(centerData.direccion);
    } else {
      setDireccion('');
    }
  }, [centro]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías hacer una búsqueda real en la API; por ahora, mostramos los datos en consola
    console.log('Buscando cita para:', { especialidad, centro, direccion });
  };

  return (
    <div>
      <h1>Búsqueda por Especialidad</h1>
      <form onSubmit={handleSubmit}>
        <label>Especialidad:</label>
        <input
          type="text"
          placeholder="Ej. Oftalmología Adulto"
          value={especialidad}
          onChange={(e) => setEspecialidad(e.target.value)}
          list="especialidades"
        />
        <datalist id="especialidades">
          {especialidades.map((esp, index) => (
            <option key={index} value={esp} />
          ))}
        </datalist>

        <label>Centro de Salud:</label>
        <select value={centro} onChange={(e) => setCentro(e.target.value)}>
          {centrosSalud.map((centroItem, index) => (
            <option key={index} value={centroItem}>
              {centroItem}
            </option>
          ))}
        </select>

        <label>Dirección:</label>
        <input type="text" value={direccion} readOnly />

        <button type="submit">Buscar cita</button>
      </form>

      <div>
        <h2>Médicos disponibles</h2>
        {medicosFiltrados.length > 0 ? (
          <ul>
            {medicosFiltrados.map((m, index) => (
              <li key={index}>{m.nombre}</li>
            ))}
          </ul>
        ) : (
          <p>No hay médicos disponibles para esta especialidad.</p>
        )}
      </div>
    </div>
  );
};

export default BusquedaEspecialidad;
