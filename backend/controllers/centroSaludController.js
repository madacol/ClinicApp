// backend/controllers/centroSaludController.js
const dbquery = require('../dbquery'); // ajusta la ruta según la estructura de carpetas
const CentroSalud = require('../models/centroSaludModel');

exports.registerCentroSalud = async (req, res) => {
  const centroData = req.body;
  try {
    // Validar datos usando el modelo (este método debe verificar que los campos obligatorios estén presentes)
    const nuevoCentro = new CentroSalud(centroData);
    nuevoCentro.validarDatos();

    // Inserta el centro de salud en la base de datos (se asume que created_at se asigna automáticamente)
    const query = `
      INSERT INTO centros_salud (nombre, direccion, telefono, email, otrosDatos)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      centroData.nombre,
      centroData.direccion,
      centroData.telefono,
      centroData.email,
      centroData.otrosDatos
    ];
    const result = await dbquery(query, values);

    // Asignar el id generado al objeto y responder
    nuevoCentro.id = result.insertId;
    res.status(201).json({ message: "Centro de salud registrado exitosamente", centro: nuevoCentro });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCentroSalud = async (req, res) => {
  const centroId = req.params.id;
  try {
    const query = 'SELECT * FROM centros_salud WHERE id = ?';
    const rows = await dbquery(query, [centroId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Centro de salud no encontrado" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el centro de salud", error: error.message });
  }
};

exports.getAllCentrosSalud = async (req, res) => {
  try {
    const query = 'SELECT * FROM centros_salud';
    const rows = await dbquery(query);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener centros de salud", error: error.message });
  }
};

exports.updateCentroSalud = async (req, res) => {
  const centroId = req.params.id;
  const updatedData = req.body;
  try {
    const query = `
      UPDATE centros_salud
      SET nombre = ?, direccion = ?, telefono = ?, email = ?, otrosDatos = ?
      WHERE id = ?
    `;
    const values = [
      updatedData.nombre,
      updatedData.direccion,
      updatedData.telefono,
      updatedData.email,
      updatedData.otrosDatos,
      centroId
    ];
    const result = await dbquery(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Centro de salud no encontrado" });
    }
    res.status(200).json({ message: "Centro de salud actualizado", centroId, updatedData });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar centro de salud", error: error.message });
  }
};

exports.deleteCentroSalud = async (req, res) => {
  const centroId = req.params.id;
  try {
    const query = 'DELETE FROM centros_salud WHERE id = ?';
    const result = await dbquery(query, [centroId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Centro de salud no encontrado" });
    }
    res.status(200).json({ message: "Centro de salud eliminado", centroId });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar centro de salud", error: error.message });
  }
};
