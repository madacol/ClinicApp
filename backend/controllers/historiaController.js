// backend/controllers/historiaController.js
const dbquery = require('../dbquery'); // ajusta la ruta según la estructura de carpetas

// Registrar una consulta en la historia médica
exports.registerConsulta = async (req, res) => {
  const {
    PacienteID,
    FechaConsulta,
    MotivoConsulta,
    Diagnostico,
    Tratamiento,
    AntecedentesFamiliares,
    EnfermedadesOcularesPrevias,
    PrescripcionLentes,
    UsoLentesContacto,
    CirugiasOcularesPrevias,
    ExamenVisual,
    PresionOcular,
    CampoVisual,
    FondoDeOjo,
    TratamientosPrevios,
    MedicamentosRecetados,
    RecomendacionesMedicas,
    ProximoControl,
    TomografiaRetina,
    EcografiaOcular,
    OjoDerechoEstado,
    OjoIzquierdoEstado,
    NivelDolor,
    Observaciones
  } = req.body;

  try {
    const query = `
      INSERT INTO historia_medica (
        pacienteID, FechaConsulta, MotivoConsulta, Diagnostico, Tratamiento,
        AntecedentesFamiliares, EnfermedadesOcularesPrevias, PrescripcionLentes, UsoLentesContacto,
        CirugiasOcularesPrevias, ExamenVisual, PresionOcular, CampoVisual, FondoDeOjo,
        TratamientosPrevios, MedicamentosRecetados, RecomendacionesMedicas, ProximoControl,
        TomografiaRetina, EcografiaOcular, OjoDerechoEstado, OjoIzquierdoEstado, NivelDolor,
        Observaciones
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      PacienteID,
      FechaConsulta,
      MotivoConsulta,
      Diagnostico,
      Tratamiento,
      AntecedentesFamiliares,
      EnfermedadesOcularesPrevias,
      PrescripcionLentes,
      UsoLentesContacto,
      CirugiasOcularesPrevias,
      ExamenVisual,
      PresionOcular,
      CampoVisual,
      FondoDeOjo,
      TratamientosPrevios,
      MedicamentosRecetados,
      RecomendacionesMedicas,
      ProximoControl,
      TomografiaRetina,
      EcografiaOcular,
      OjoDerechoEstado,
      OjoIzquierdoEstado,
      NivelDolor,
      Observaciones,
    ];

    const result = await dbquery(query, values);
    res.status(201).json({ message: "Consulta registrada exitosamente", consultaId: result.insertId });
  } catch (error) {
    console.error("Error al registrar la consulta:", error);
    // Verificamos si el error indica un problema con el campo ProximoControl
    let mensajeCompleto = "Error al registrar la consulta. Por favor, revise que todos los campos obligatorios estén llenos.";
    if (error.message && error.message.includes("ProximoControl")) {
      mensajeCompleto = "Error al registrar la consulta. El campo 'Próximo Control' es obligatorio. Por favor, complete ese campo.";
    }
    // También se puede revisar si el error tiene respuesta del servidor
    if (error.response && error.response.data && error.response.data.message) {
      mensajeCompleto = error.response.data.message;
    }
    res.status(500).json({ message: mensajeCompleto });
  }
};

// Obtener la historia médica de un paciente
exports.getHistoriaByPaciente = async (req, res) => {
  const pacienteId = req.params.pacienteId;
  try {
    const query = 'SELECT * FROM historia_medica WHERE pacienteID = ? ORDER BY FechaConsulta DESC';
    const rows = await dbquery(query, [pacienteId]);
    res.status(200).json({ pacienteId, historia: rows });
  } catch (error) {
    console.error("Error al obtener la historia médica:", error);
    res.status(500).json({ message: "Error al obtener la historia médica" });
  }
};

// Actualizar una consulta existente
exports.updateConsulta = async (req, res) => {
  const consultaId = req.params.consultaId;
  const {
    PacienteID,
    FechaConsulta,
    MotivoConsulta,
    Diagnostico,
    Tratamiento,
    AntecedentesFamiliares,
    EnfermedadesOcularesPrevias,
    PrescripcionLentes,
    UsoLentesContacto,
    CirugiasOcularesPrevias,
    ExamenVisual,
    PresionOcular,
    CampoVisual,
    FondoDeOjo,
    TratamientosPrevios,
    MedicamentosRecetados,
    RecomendacionesMedicas,
    ProximoControl,
    TomografiaRetina,
    EcografiaOcular,
    OjoDerechoEstado,
    OjoIzquierdoEstado,
    NivelDolor,
    Observaciones,
  } = req.body;

  try {
    const query = `
      UPDATE historia_medica
      SET pacienteID = ?, FechaConsulta = ?, MotivoConsulta = ?, Diagnostico = ?, Tratamiento = ?,
          AntecedentesFamiliares = ?, EnfermedadesOcularesPrevias = ?, PrescripcionLentes = ?, UsoLentesContacto = ?,
          CirugiasOcularesPrevias = ?, ExamenVisual = ?, PresionOcular = ?, CampoVisual = ?, FondoDeOjo = ?,
          TratamientosPrevios = ?, MedicamentosRecetados = ?, RecomendacionesMedicas = ?, ProximoControl = ?,
          TomografiaRetina = ?, EcografiaOcular = ?, OjoDerechoEstado = ?, OjoIzquierdoEstado = ?, NivelDolor = ?,
          Observaciones = ?
      WHERE id = ?
    `;
    const values = [
      PacienteID,
      FechaConsulta,
      MotivoConsulta,
      Diagnostico,
      Tratamiento,
      AntecedentesFamiliares,
      EnfermedadesOcularesPrevias,
      PrescripcionLentes,
      UsoLentesContacto,
      CirugiasOcularesPrevias,
      ExamenVisual,
      PresionOcular,
      CampoVisual,
      FondoDeOjo,
      TratamientosPrevios,
      MedicamentosRecetados,
      RecomendacionesMedicas,
      ProximoControl,
      TomografiaRetina,
      EcografiaOcular,
      OjoDerechoEstado,
      OjoIzquierdoEstado,
      NivelDolor,
      Observaciones,
      consultaId
    ];

    const result = await dbquery(query, values);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Consulta no encontrada" });
    }
    res.status(200).json({ message: "Consulta actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar la consulta:", error);
    res.status(500).json({ message: "Error al actualizar la consulta" });
  }
};
