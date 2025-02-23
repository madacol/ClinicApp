// backend/controllers/medicoController.js
const dbquery = require('../dbquery'); // ajusta la ruta según la estructura de carpetas
const Medico = require('../models/medicoModel');

// Registrar un nuevo médico
exports.registerMedico = async (req, res) => {
  const medicoData = req.body;
  try {
    const nuevoMedico = new Medico(medicoData);
    nuevoMedico.validarDatos();

    // Insertar el médico en la base de datos
    const query = `
      INSERT INTO medicos (nombre, especialidades, asignaciones)
      VALUES (?, ?, ?)
    `;
    // Convertir arrays a JSON, en caso de que lo sean
    const values = [
      nuevoMedico.nombre,
      JSON.stringify(nuevoMedico.especialidades),
      JSON.stringify(nuevoMedico.asignaciones)
    ];
    const result = await dbquery(query, values);
    nuevoMedico.id = result.insertId;

    res.status(201).json({ message: "Médico registrado exitosamente", medico: nuevoMedico });
  } catch (error) {
    console.error("Error al registrar el médico:", error);
    res.status(400).json({ message: error.message });
  }
};

// Obtener un médico por ID
exports.getMedico = async (req, res) => {
  const medicoId = req.params.id;
  try {
    const query = 'SELECT * FROM medicos WHERE id = ?';
    const rows = await dbquery(query, [medicoId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Médico no encontrado" });
    }

    const medico = rows[0];
    // Convertir las columnas JSON a objetos, si es necesario
    medico.especialidades = JSON.parse(medico.especialidades);
    medico.asignaciones = JSON.parse(medico.asignaciones);

    res.status(200).json(medico);
  } catch (error) {
    console.error("Error al obtener el médico:", error);
    res.status(500).json({ message: "Error al obtener el médico", error: error.message });
  }
};

// Obtener todos los médicos
exports.getAllMedicos = async (req, res) => {
  try {
    const query = 'SELECT * FROM medicos';
    const rows = await dbquery(query);
    // Convertir campos JSON a objetos para cada médico
    const medicos = rows.map((medico) => ({
      ...medico,
      especialidades: JSON.parse(medico.especialidades),
      asignaciones: JSON.parse(medico.asignaciones)
    }));

    res.status(200).json(medicos);
  } catch (error) {
    console.error("Error al obtener los médicos:", error);
    res.status(500).json({ message: "Error al obtener los médicos", error: error.message });
  }
};

// Actualizar un médico
exports.updateMedico = async (req, res) => {
  const medicoId = req.params.id;
  const updatedData = req.body;
  try {
    const query = `
      UPDATE medicos
      SET nombre = ?, especialidades = ?, asignaciones = ?
      WHERE id = ?
    `;
    const values = [
      updatedData.nombre,
      JSON.stringify(updatedData.especialidades),
      JSON.stringify(updatedData.asignaciones),
      medicoId
    ];
    const result = await dbquery(query, values);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Médico no encontrado" });
    }
    res.status(200).json({ message: "Médico actualizado", medicoId, updatedData });
  } catch (error) {
    console.error("Error al actualizar el médico:", error);
    res.status(500).json({ message: "Error al actualizar el médico", error: error.message });
  }
};

// Eliminar un médico
exports.deleteMedico = async (req, res) => {
  const medicoId = req.params.id;
  try {
    const query = 'DELETE FROM medicos WHERE id = ?';
    const result = await dbquery(query, [medicoId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Médico no encontrado" });
    }
    res.status(200).json({ message: "Médico eliminado", medicoId });
  } catch (error) {
    console.error("Error al eliminar el médico:", error);
    res.status(500).json({ message: "Error al eliminar el médico", error: error.message });
  }
};
