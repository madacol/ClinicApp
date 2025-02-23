// src/pages/ReservarCita.js
import React, { useState } from 'react';
// Importa los datos estáticos desde ListaMedicos.js
import { medicosData as medicos, especialidadesData as especialidades, centrosSaludData as centrosSalud } from './ListaMedicos';

const ReservarCita = () => {
  const [isEspecialidad, setIsEspecialidad] = useState(true);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('Oftalmología Adulto');
  const [centroSalud, setCentroSalud] = useState('Consultorio Dra. Rosmarian Castillo');
  const [direccionCentro, setDireccionCentro] = useState('Centro empresarial Qvadra, F5W8+757, Caracas 1071, Miranda, Venezuela');
  const [medicoSeleccionado, setMedicoSeleccionado] = useState('Rosmarian Castillo');
  const [medicosDisponibles] = useState(medicos);

  const toggleBusqueda = () => {
    setIsEspecialidad(!isEspecialidad);
    if (!isEspecialidad) {
      setEspecialidadSeleccionada('');
      setCentroSalud('Consultorio Dra. Rosmarian Castillo');
      setDireccionCentro('Centro empresarial Qvadra, F5W8+757, Caracas 1071, Miranda, Venezuela');
    }
  };

  const obtenerCentrosPorMedico = () => {
    const medicoData = medicos.find((m) => m.nombre === medicoSeleccionado);
    return medicoData ? medicoData.centros : [];
  };

  const handleBuscarCita = (e) => {
    e.preventDefault();
    console.log('Buscando cita...', {
      especialidad: especialidadSeleccionada,
      medico: medicoSeleccionado,
      centroSalud,
      direccionCentro,
    });
  };

  return (
    <div>
      <h1>Reservar Cita</h1>
      <form onSubmit={handleBuscarCita}>
        <div>
          <h4>Click para cambiar búsqueda</h4>
          <button type="button" onClick={toggleBusqueda}>
            {isEspecialidad ? 'Buscar por Médico' : 'Buscar por Especialidad'}
          </button>
        </div>

        {isEspecialidad ? (
          <div>
            <label>Especialidad:</label>
            <select
              name="especialidad"
              value={especialidadSeleccionada}
              onChange={(e) => setEspecialidadSeleccionada(e.target.value)}
              required
            >
              {especialidades.map((esp, idx) => (
                <option key={idx} value={esp}>
                  {esp}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <label>Médico:</label>
            <select
              name="medico"
              value={medicoSeleccionado}
              onChange={(e) => {
                setMedicoSeleccionado(e.target.value);
                const medicoData = medicos.find((m) => m.nombre === e.target.value);
                setCentroSalud(medicoData ? medicoData.centros[0] : '');
                setDireccionCentro(medicoData ? medicoData.direccion : '');
              }}
              required
            >
              {medicosDisponibles.map((m, idx) => (
                <option key={idx} value={m.nombre}>
                  {m.nombre}
                </option>
              ))}
            </select>

            <label>Centro de Salud:</label>
            <select
              name="centroSalud"
              value={centroSalud}
              onChange={(e) => {
                setCentroSalud(e.target.value);
                const centroSeleccionado = medicos.find((m) => m.centros.includes(e.target.value));
                setDireccionCentro(centroSeleccionado ? centroSeleccionado.direccion : '');
              }}
              required
            >
              {obtenerCentrosPorMedico().map((centro, idx) => (
                <option key={idx} value={centro}>
                  {centro}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label>Dirección del Centro de Salud:</label>
          <input type="text" name="direccionCentro" value={direccionCentro} readOnly />
        </div>

        <button type="submit">Buscar cita</button>
      </form>
    </div>
  );
};

export default ReservarCita;
