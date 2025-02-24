// backend/controllers/historiaController.js
const dbquery = require('../dbquery'); // Ajusta la ruta según la estructura de carpetas

// Registrar una consulta en la historia médica
exports.registerConsulta = async (req, res) => {
  try {
    const {
      PacienteID,
      FechaConsulta,
      MotivoConsulta,
      Diagnostico = "",
      Tratamiento = "",
      AntecedentesFamiliares = "",
      EnfermedadesOcularesPrevias = "",
      PrescripcionLentes = "",
      UsoLentesContacto = "",
      CirugiasOcularesPrevias = "",
      ExamenVisual = "",
      PresionOcular = "",
      CampoVisual = "",
      FondoDeOjo = "",
      TratamientosPrevios = "",
      MedicamentosRecetados = "",
      RecomendacionesMedicas = "",
      ProximoControl,
      TomografiaRetina = "",
      EcografiaOcular = "",
      OjoDerechoEstado = "",
      OjoIzquierdoEstado = "",
      NivelDolor = "",
      Observaciones = "",
      RpNombre = "",
      RpConcentracion = "",
      RpVia = "",
      RpFrecuencia = "",
      RpDuracion = "",
      LejosODEsfera = "",
      LejosOIEsfera = "",
      LejosODCilindro = "",
      LejosOICilindro = "",
      LejosODEje = "",
      LejosOIEje = "",
      LejosODAv = "",
      LejosOIAv = "",
      CercaODADD = "",
      CercaOIADD = "",
      CercaODAVCC = "",
      CercaOIAVCC = "",
      TipoLente = "",
      AlturaLente = "",
      DIP = "",
      Filtro = ""
    } = req.body;

    const columnas = [
      "pacienteID", "FechaConsulta", "MotivoConsulta", "Diagnostico", "Tratamiento",
      "AntecedentesFamiliares", "EnfermedadesOcularesPrevias", "PrescripcionLentes", "UsoLentesContacto",
      "CirugiasOcularesPrevias", "ExamenVisual", "PresionOcular", "CampoVisual", "FondoDeOjo",
      "TratamientosPrevios", "MedicamentosRecetados", "RecomendacionesMedicas", "ProximoControl",
      "TomografiaRetina", "EcografiaOcular", "OjoDerechoEstado", "OjoIzquierdoEstado", "NivelDolor",
      "Observaciones", "RpNombre", "RpConcentracion", "RpVia", "RpFrecuencia", "RpDuracion",
      "LejosODEsfera", "LejosOIEsfera", "LejosODCilindro", "LejosOICilindro", "LejosODEje", "LejosOIEje",
      "LejosODAv", "LejosOIAv", "CercaODADD", "CercaOIADD", "CercaODAVCC", "CercaOIAVCC",
      "TipoLente", "AlturaLente", "DIP", "Filtro"
    ];

    const valores = [
      PacienteID, FechaConsulta, MotivoConsulta, Diagnostico, Tratamiento,
      AntecedentesFamiliares, EnfermedadesOcularesPrevias, PrescripcionLentes, UsoLentesContacto,
      CirugiasOcularesPrevias, ExamenVisual, PresionOcular, CampoVisual, FondoDeOjo,
      TratamientosPrevios, MedicamentosRecetados, RecomendacionesMedicas, ProximoControl,
      TomografiaRetina, EcografiaOcular, OjoDerechoEstado, OjoIzquierdoEstado, NivelDolor,
      Observaciones, RpNombre, RpConcentracion, RpVia, RpFrecuencia, RpDuracion,
      LejosODEsfera, LejosOIEsfera, LejosODCilindro, LejosOICilindro, LejosODEje, LejosOIEje,
      LejosODAv, LejosOIAv, CercaODADD, CercaOIADD, CercaODAVCC, CercaOIAVCC,
      TipoLente, AlturaLente, DIP, Filtro
    ];

    // Verificar si la cantidad de columnas y valores coincide
    console.log(`✅ Cantidad de columnas en la BD: ${columnas.length}`);
    console.log(`✅ Cantidad de valores enviados: ${valores.length}`);

    if (columnas.length !== valores.length) {
      console.error("❌ ERROR: La cantidad de valores no coincide con la cantidad de columnas.");
      return res.status(500).json({
        message: `Error al registrar la consulta. Se esperaban ${columnas.length} valores, pero se recibieron ${valores.length}.`
      });
    }

    const query = `INSERT INTO historia_medica (${columnas.join(", ")}) VALUES (${columnas.map(() => "?").join(", ")})`;

    const result = await dbquery(query, valores);
    res.status(201).json({ message: "Consulta registrada exitosamente", consultaId: result.insertId });
  } catch (error) {
    console.error("❌ Error al registrar la consulta:", error);
    res.status(500).json({ message: "Error al registrar la consulta. Verifica los datos e inténtalo nuevamente." });
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
    RpNombre,
    RpConcentracion,
    RpVia,
    RpFrecuencia,
    RpDuracion,
    LejosODEsfera,
    LejosOIEsfera,
    LejosODCilindro,
    LejosOICilindro,
    LejosODEje,
    LejosOIEje,
    LejosODAv,
    LejosOIAv,
    CercaODADD,
    CercaOIADD,
    CercaODAVCC,
    CercaOIAVCC,
    TipoLente,
    AlturaLente,
    DIP,
    Filtro
  } = req.body;

  try {
    const query = `
      UPDATE historia_medica
      SET pacienteID = ?, FechaConsulta = ?, MotivoConsulta = ?, Diagnostico = ?, Tratamiento = ?,
          AntecedentesFamiliares = ?, EnfermedadesOcularesPrevias = ?, PrescripcionLentes = ?, UsoLentesContacto = ?,
          CirugiasOcularesPrevias = ?, ExamenVisual = ?, PresionOcular = ?, CampoVisual = ?, FondoDeOjo = ?,
          TratamientosPrevios = ?, MedicamentosRecetados = ?, RecomendacionesMedicas = ?, ProximoControl = ?,
          TomografiaRetina = ?, EcografiaOcular = ?, OjoDerechoEstado = ?, OjoIzquierdoEstado = ?, NivelDolor = ?,
          Observaciones = ?, RpNombre = ?, RpConcentracion = ?, RpVia = ?, RpFrecuencia = ?, RpDuracion = ?,
          LejosODEsfera = ?, LejosOIEsfera = ?, LejosODCilindro = ?, LejosOICilindro = ?, LejosODEje = ?, LejosOIEje = ?,
          LejosODAv = ?, LejosOIAv = ?, CercaODADD = ?, CercaOIADD = ?, CercaODAVCC = ?, CercaOIAVCC = ?,
          TipoLente = ?, AlturaLente = ?, DIP = ?, Filtro = ?
      WHERE id = ?
    `;

    const values = [
      PacienteID, FechaConsulta, MotivoConsulta, Diagnostico, Tratamiento,
      AntecedentesFamiliares, EnfermedadesOcularesPrevias, PrescripcionLentes, UsoLentesContacto,
      CirugiasOcularesPrevias, ExamenVisual, PresionOcular, CampoVisual, FondoDeOjo,
      TratamientosPrevios, MedicamentosRecetados, RecomendacionesMedicas, ProximoControl,
      TomografiaRetina, EcografiaOcular, OjoDerechoEstado, OjoIzquierdoEstado, NivelDolor,
      Observaciones, RpNombre, RpConcentracion, RpVia, RpFrecuencia, RpDuracion,
      LejosODEsfera, LejosOIEsfera, LejosODCilindro, LejosOICilindro, LejosODEje, LejosOIEje,
      LejosODAv, LejosOIAv, CercaODADD, CercaOIADD, CercaODAVCC, CercaOIAVCC,
      TipoLente, AlturaLente, DIP, Filtro, consultaId
    ];

    const result = await dbquery(query, values);
    res.status(200).json({ message: "Consulta actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar la consulta:", error);
    res.status(500).json({ message: "Error al actualizar la consulta" });
  }
};
