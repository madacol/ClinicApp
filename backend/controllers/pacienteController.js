// backend/controllers/pacienteController.js
const dbquery = require('../dbquery'); // ajusta la ruta según la estructura de carpetas

// Registrar un paciente
exports.registerPatient = async (req, res) => {
    const {
        nombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        sexo,
        fechaNacimiento,
        tipoDocumento,
        numeroDocumento,
        nacionalidad,
        estadoResidencia,
        ciudad,
        direccion,
        telefono,
        correo,
        modoPago,
        seguro
    } = req.body;

    try {
        // Insertar el paciente en la base de datos
        const query = `
            INSERT INTO pacientes (
                nombre, segundoNombre, primerApellido, segundoApellido,
                sexo, fechaNacimiento, tipoDocumento, numeroDocumento, 
                nacionalidad, estadoResidencia, ciudad, direccion, 
                telefono, correo, modoPago, seguro
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            nombre, segundoNombre, primerApellido, segundoApellido,
            sexo, fechaNacimiento, tipoDocumento, numeroDocumento,
            nacionalidad, estadoResidencia, ciudad, direccion,
            telefono, correo, modoPago, seguro
        ];

        const result = await dbquery(query, values);

        res.status(201).json({ message: "Paciente registrado exitosamente", pacienteId: result.insertId });
    } catch (error) {
        console.error("Error al registrar el paciente:", error);
        res.status(500).json({ message: "Error al registrar el paciente" });
    }
};

// Obtener un paciente por número de documento
exports.getPatient = async (req, res) => {
    // Se utiliza el parámetro "id" definido en la ruta, que en este caso es el número de documento
    const numeroDocumento = req.params.id; 
    try {
      const query = 'SELECT * FROM pacientes WHERE numeroDocumento = ?';
      const rows = await dbquery(query, [numeroDocumento]);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Paciente no encontrado' });
      }
  
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error("Error al obtener el paciente:", error);
      res.status(500).json({ message: "Error al obtener el paciente" });
    }
};

// Obtener todos los pacientes
exports.getAllPatients = async (req, res) => {
  try {
    const query = 'SELECT * FROM pacientes';
    const rows = await dbquery(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener pacientes:", error);
    res.status(500).json({ message: "Error al obtener pacientes" });
  }
};

// Actualizar un paciente
exports.updatePatient = async (req, res) => {
  const patientId = req.params.id;
  const {
    nombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    sexo,
    fechaNacimiento,
    tipoDocumento,
    numeroDocumento,
    nacionalidad,
    estadoResidencia,
    ciudad,
    direccion,
    telefono,
    correo,
    modoPago,
    seguro
  } = req.body;

  try {
    const query = `
      UPDATE pacientes
      SET nombre = ?, segundoNombre = ?, primerApellido = ?, segundoApellido = ?,
          sexo = ?, fechaNacimiento = ?, tipoDocumento = ?, numeroDocumento = ?,
          nacionalidad = ?, estadoResidencia = ?, ciudad = ?, direccion = ?,
          telefono = ?, correo = ?, modoPago = ?, seguro = ?
      WHERE id = ?
    `;
    const values = [
      nombre, segundoNombre, primerApellido, segundoApellido,
      sexo, fechaNacimiento, tipoDocumento, numeroDocumento,
      nacionalidad, estadoResidencia, ciudad, direccion,
      telefono, correo, modoPago, seguro, patientId
    ];

    const result = await dbquery(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    res.status(200).json({ message: "Paciente actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar el paciente:", error);
    res.status(500).json({ message: "Error al actualizar el paciente" });
  }
};

// Eliminar un paciente
exports.deletePatient = async (req, res) => {
  const patientId = req.params.id;
  try {
    const query = 'DELETE FROM pacientes WHERE id = ?';
    const result = await dbquery(query, [patientId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    res.status(200).json({ message: "Paciente eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el paciente:", error);
    res.status(500).json({ message: "Error al eliminar el paciente" });
  }
};
