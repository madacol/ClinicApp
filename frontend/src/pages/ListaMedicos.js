// src/pages/ListaMedicos.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Datos estáticos de ejemplo (puedes actualizarlos o usarlos mientras integras la API)
export const medicosData = [
  {
    id: 1,
    nombre: 'Rosmarian Castillo',
    especialidades: ['Oftalmología Adulto'],
    centros: ['Consultorio Dra. Rosmarian Castillo', 'Hospital Universitario'],
    direccion: 'Centro empresarial Qvadra, F5W8+757, Caracas 1071, Miranda, Venezuela'
  },
  {
    id: 2,
    nombre: 'Carlos González',
    especialidades: ['Dermatología'],
    centros: ['Centro de Salud Dermatológico'],
    direccion: 'Av. La Paz, Caracas 1040, Venezuela'
  }
];

export const especialidadesData = [
  'Oftalmología Adulto',
  'Dermatología'
];

export const centrosSaludData = [
  'Consultorio Dra. Rosmarian Castillo',
  'Hospital Universitario',
  'Centro de Salud Dermatológico'
];

const ListaMedicos = () => {
  const [medicos, setMedicos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/medicos')
      .then(response => {
        const medicosParsed = response.data.map(medico => ({
          ...medico,
          // Si las columnas 'especialidades' y 'asignaciones' vienen como JSON strings, se parsean:
          especialidades: typeof medico.especialidades === 'string' ? JSON.parse(medico.especialidades) : medico.especialidades,
          asignaciones: typeof medico.asignaciones === 'string' ? JSON.parse(medico.asignaciones) : medico.asignaciones
        }));
        setMedicos(medicosParsed);
      })
      .catch(err => {
        console.error("Error al obtener médicos:", err);
        setError("Error al cargar los médicos");
      });
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Lista de Médicos</h1>
      <ul>
        {medicos.map((medico) => (
          <li key={medico.id}>
            <strong>{medico.nombre}</strong> <br />
            Especialidades: {Array.isArray(medico.especialidades) ? medico.especialidades.join(', ') : medico.especialidades}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaMedicos;
