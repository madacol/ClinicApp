// src/pages/HistoriaMedica.js
import React, { useState } from "react";
import axios from "axios";
import { exportToWord } from "./ExportarWord";

// Función para formatear fechas al formato "YYYY-MM-DD"
const formatDateForInput = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toISOString().split("T")[0];
};

// Funcion para formatear fechas spanish
const formatDateToSpanish = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  return `${date.getDate()}-${meses[date.getMonth()]}-${date.getFullYear()}`;
};

// Función para calcular la edad a partir de la fecha de nacimiento
const calculateAge = (birthDateStr) => {
  if (!birthDateStr) return "";
  const birthDate = new Date(birthDateStr);
  const now = new Date();
  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();
  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  return `${years} años, ${months} meses, ${days} días`;
};

// Función para generar el texto completo de una consulta (para exportar o visualizar)
const generateConsultaText = (consulta, index) => {
  return `Consulta ${index + 1}:
Fecha de Consulta: ${formatDateForInput(consulta.FechaConsulta)}
Motivo de Consulta: ${consulta.MotivoConsulta}
Diagnóstico: ${consulta.Diagnostico}
Tratamiento: ${consulta.Tratamiento}
Antecedentes Familiares: ${consulta.AntecedentesFamiliares}
Enfermedades Oculares Previas: ${consulta.EnfermedadesOcularesPrevias}
Prescripción de Lentes: ${consulta.PrescripcionLentes}
Uso de Lentes de Contacto: ${consulta.UsoLentesContacto}
Cirugías Oculares Previas: ${consulta.CirugiasOcularesPrevias}
Examen Visual: ${consulta.ExamenVisual}
Presión Ocular: ${consulta.PresionOcular}
Campo Visual: ${consulta.CampoVisual}
Fondo de Ojo: ${consulta.FondoDeOjo}
Tratamientos Previos: ${consulta.TratamientosPrevios}
Medicamentos Recetados: ${consulta.MedicamentosRecetados}
Recomendaciones Médicas: ${consulta.RecomendacionesMedicas}
Próximo Control: ${formatDateForInput(consulta.ProximoControl)}
Tomografía de Retina: ${consulta.TomografiaRetina}
Ecografía Ocular: ${consulta.EcografiaOcular}
Ojo Derecho Estado: ${consulta.OjoDerechoEstado}
Ojo Izquierdo Estado: ${consulta.OjoIzquierdoEstado}
Nivel de Dolor: ${consulta.NivelDolor}
Observaciones: ${consulta.Observaciones}\n`;
};

const HistoriaMedica = () => {
  // Estado principal del formulario
  const [formData, setFormData] = useState({
    PacienteID: "",
    FechaConsulta: new Date().toISOString().split("T")[0],
    MotivoConsulta: "",
    Diagnostico: "",
    Tratamiento: "",
    AntecedentesFamiliares: "",
    EnfermedadesOcularesPrevias: "",
    PrescripcionLentes: "",
    UsoLentesContacto: "",
    CirugiasOcularesPrevias: "",
    ExamenVisual: "",
    PresionOcular: "",
    CampoVisual: "",
    FondoDeOjo: "",
    TratamientosPrevios: "",
    MedicamentosRecetados: "",
    RecomendacionesMedicas: "",
    ProximoControl: "",
    TomografiaRetina: "",
    EcografiaOcular: "",
    OjoDerechoEstado: "",
    OjoIzquierdoEstado: "",
    NivelDolor: "",
    Observaciones: "",
    RpNombre: "",
    RpConcentracion: "",
    RpVia: "",
    RpFrecuencia: "",
    RpDuracion: "",
    LejosODEsfera: "",
    LejosOIEsfera: "",
    LejosODCilindro: "",
    LejosOICilindro: "",
    LejosODEje: "",
    LejosOIEje: "",
    LejosODAv: "",
    LejosOIAv: "",
    CercaODADD: "",
    CercaOIADD: "",
    CercaODAVCC: "",
    CercaOIAVCC: "",
    TipoLente: "",
    AlturaLente: "",
    DIP: "",
    Filtro: ""
  });
 
  // Estado para el formulario temporal de medicamento
  const [medTemp, setMedTemp] = useState({
    nombre: "",
    concentracion: "",
    via: "Gotas",
    frecuencia: "",
    duracion: "",
    unidad: "",
  });

  const [historiaMedica, setHistoriaMedica] = useState([]);
  const [paciente, setPaciente] = useState(null);
  const [buscarPacienteID, setBuscarPacienteID] = useState("");
  const [error, setError] = useState("");
  const [selectedConsultaIndex, setSelectedConsultaIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  // Ajusta la altura del textarea dinámicamente
  const handleAutoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Manejar cambios en el formulario principal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar cambios en el formulario temporal de medicamento
  const handleMedChange = (e) => {
    const { name, value } = e.target;
    setMedTemp((prev) => ({ ...prev, [name]: value }));
  };

  // Agregar medicamento: se concatena la información al campo "Observaciones" con un salto de línea
  const handleAddMedicamento = () => {
    if (!medTemp.nombre) {
      window.alert("Ingrese el nombre del medicamento");
      return;
    }
    const medString = `-Medicamento: ${medTemp.nombre}; Concentración: ${medTemp.concentracion}; Vía: ${medTemp.via}; Frecuencia: ${medTemp.frecuencia}; Duración: ${medTemp.duracion} ${medTemp.unidad}`;
    setFormData((prev) => ({
      ...prev,
      Observaciones: prev.Observaciones
        ? `${prev.Observaciones}\n\n${medString}`
        : medString,
    }));
    // Limpiar el formulario temporal
    setMedTemp({
      nombre: "",
      concentracion: "",
      via: "Gotas",
      frecuencia: "",
      duracion: "",
      unidad: "",
    });
  };
  

  // Función para manejar cambios en el campo de búsqueda de paciente
  const handleBuscarPaciente = (e) => {
    setBuscarPacienteID(e.target.value);
  };

  // Buscar paciente y obtener su historia médica
  const handleVerHistoria = async () => {
    if (!buscarPacienteID) {
      window.alert("Ingrese un número de documento para buscar");
      return;
    }
    try {
      const patientResponse = await axios.get(`http://localhost:5000/api/pacientes/${buscarPacienteID}`);
      const patient = patientResponse.data;
      if (!patient || !patient.numeroDocumento) {
        window.alert("Paciente no registrado. Registre al paciente para ingresar su historia médica.");
        setPaciente(null);
        return;
      }
      const historiaResponse = await axios.get(`http://localhost:5000/api/historia-medica/${patient.id}`);
      const { historia } = historiaResponse.data;
      if (historia && historia.length > 0) {
        setHistoriaMedica(historia);
        setSelectedConsultaIndex(0);
      } else {
        setHistoriaMedica([]);
        window.alert("El paciente no tiene consultas previas. Registre la primera consulta.");
      }
      setPaciente(patient);
      setFormData((prev) => ({ ...prev, PacienteID: patient.id }));
      setError("");
      setShowAll(false);
    } catch (err) {
      console.error("Error al obtener la historia médica:", err);
      window.alert("Paciente no registrado. Registre al paciente para ingresar su historia médica.");
      setPaciente(null);
    }
  };

  // Registrar una nueva consulta
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.PacienteID) {
      window.alert("Paciente no registrado. Por favor, busque un paciente.");
      return;
    }
    if (!formData.FechaConsulta) {
      window.alert("Por favor, complete el campo Fecha de Consulta.");
      return;
    }
    if (!formData.MotivoConsulta) {
      window.alert("Por favor, complete el campo Motivo de Consulta.");
      return;
    }
    if (!formData.ProximoControl) {
      window.alert("El campo Próximo Control es obligatorio. Por favor, complételo.");
      return;
    }
    // Si no se ingresa tratamiento, se envía como cadena vacía
    const dataToSend = {
      ...formData,
      Tratamiento: formData.Tratamiento || "",
      FechaConsulta: formatDateForInput(formData.FechaConsulta),
    };

    axios
      .post("http://localhost:5000/api/historia-medica", dataToSend)
      .then((response) => {
        window.alert("Historia médica registrada con éxito.");
        setFormData((prev) => ({
          ...{
            FechaConsulta: new Date().toISOString().split("T")[0],
            MotivoConsulta: "",
            Diagnostico: "",
            Tratamiento: "",
            AntecedentesFamiliares: "",
            EnfermedadesOcularesPrevias: "",
            PrescripcionLentes: "",
            UsoLentesContacto: "",
            CirugiasOcularesPrevias: "",
            ExamenVisual: "",
            PresionOcular: "",
            CampoVisual: "",
            FondoDeOjo: "",
            TratamientosPrevios: "",
            MedicamentosRecetados: "",
            RecomendacionesMedicas: "",
            ProximoControl: "",
            TomografiaRetina: "",
            EcografiaOcular: "",
            OjoDerechoEstado: "",
            OjoIzquierdoEstado: "",
            NivelDolor: "",
            Observaciones: "",
          },
          PacienteID: prev.PacienteID,
        }));
        setError("");
        handleVerHistoria();
      })
      .catch((err) => {
        console.error("Error al registrar la historia médica:", err);
        const errMsg =
          err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : "Error al registrar la consulta. Por favor, revise que todos los campos obligatorios estén llenos, especialmente Próximo Control.";
        window.alert(errMsg);
        setError(errMsg);
      });
  };

  // Función para renderizar una consulta
  const renderConsulta = (consulta) => (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
        marginBottom: "1rem",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <p>
        <strong>Fecha de Consulta:</strong> {formatDateForInput(consulta.FechaConsulta)}
      </p>
      <p>
        <strong>Motivo de Consulta:</strong> {consulta.MotivoConsulta}
      </p>
      <p>
        <strong>Diagnóstico:</strong> {consulta.Diagnostico}
      </p>
      <p>
        <strong>Tratamiento:</strong> {consulta.Tratamiento}
      </p>
      <p>
        <strong>Antecedentes Familiares:</strong> {consulta.AntecedentesFamiliares}
      </p>
      <p>
        <strong>Enfermedades Oculares Previas:</strong> {consulta.EnfermedadesOcularesPrevias}
      </p>
      <p>
        <strong>Prescripción de Lentes:</strong> {consulta.PrescripcionLentes}
      </p>
      <p>
        <strong>Uso de Lentes de Contacto:</strong> {consulta.UsoLentesContacto}
      </p>
      <p>
        <strong>Cirugías Oculares Previas:</strong> {consulta.CirugiasOcularesPrevias}
      </p>
      <p>
        <strong>Examen Visual:</strong> {consulta.ExamenVisual}
      </p>
      <p>
        <strong>Presión Ocular:</strong> {consulta.PresionOcular}
      </p>
      <p>
        <strong>Campo Visual:</strong> {consulta.CampoVisual}
      </p>
      <p>
        <strong>Fondo de Ojo:</strong> {consulta.FondoDeOjo}
      </p>
      <p>
        <strong>Tratamientos Previos:</strong> {consulta.TratamientosPrevios}
      </p>
      <p>
        <strong>Medicamentos Recetados:</strong> {consulta.MedicamentosRecetados}
      </p>
      <p>
        <strong>Recomendaciones Médicas:</strong> {consulta.RecomendacionesMedicas}
      </p>
      <p>
        <strong>Próximo Control:</strong> {formatDateForInput(consulta.ProximoControl)}
      </p>
      <p>
        <strong>Tomografía de Retina:</strong> {consulta.TomografiaRetina}
      </p>
      <p>
        <strong>Ecografía Ocular:</strong> {consulta.EcografiaOcular}
      </p>
      <p>
        <strong>Ojo Derecho Estado:</strong> {consulta.OjoDerechoEstado}
      </p>
      <p>
        <strong>Ojo Izquierdo Estado:</strong> {consulta.OjoIzquierdoEstado}
      </p>
      <p>
        <strong>Nivel de Dolor:</strong> {consulta.NivelDolor}
      </p>
      <p>
        <strong>Observaciones:</strong> {consulta.Observaciones}
      </p>
    </div>
  );

  // Manejador para exportar el informe completo a Word usando la plantilla "InformeMedico.docx"
// Manejador para exportar el informe completo a Word usando la plantilla "InformeMedico.docx"
const handleExportToWord = async () => {
  if (!paciente) {
    window.alert("No hay información de paciente para exportar.");
    return;
  }
  if (historiaMedica.length === 0) {
    window.alert("No hay consultas disponibles para generar el informe.");
    return;
  }

  // Obtener la última consulta registrada
  const ultimaConsulta = historiaMedica[0];

  // Función para formatear la fecha en español
  const formatDateToSpanish = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return `${date.getDate()}-${meses[date.getMonth()]}-${date.getFullYear()}`;
  };

  const datosInforme = {
    nombre: `${paciente.nombre} ${paciente.segundoNombre} ${paciente.primerApellido} ${paciente.segundoApellido}`,
    sexo: paciente.sexo,
    tipoDocumento: paciente.tipoDocumento,
    numeroDocumento: paciente.numeroDocumento,
    edad: calculateAge(paciente.fechaNacimiento),
    estadoResidencia: paciente.estadoResidencia,
    ciudad: paciente.ciudad,
    direccion: paciente.direccion,
    telefono: paciente.telefono,
    MotivoConsulta: ultimaConsulta.MotivoConsulta || "No registrado",
    FechaConsulta: formatDateToSpanish(ultimaConsulta.FechaConsulta) || "No registrada",
  };

  exportToWord(datosInforme, "InformeMedico.docx");
};

  // Manejador para exportar la receta médica a Word usando la plantilla "RecipeMedico.docx"
  const handleExportToRecipeMedico = async () => {
    if (!paciente) {
      window.alert("No hay información de paciente para exportar.");
      return;
    }
    if (historiaMedica.length === 0) {
      window.alert("No hay consultas disponibles para generar la receta médica.");
      return;
    }
    const consulta = historiaMedica[selectedConsultaIndex];
    // Para la receta, se utiliza el contenido ya concatenado en RecomendacionesMedicas
    const datosReceta = {
      nombre: `${paciente.nombre} ${paciente.segundoNombre} ${paciente.primerApellido} ${paciente.segundoApellido}`,
      numeroDocumento: paciente.numeroDocumento,
      direccion: paciente.direccion,
      fechaConsulta: formatDateToSpanish(consulta.FechaConsulta),
      Rp: consulta.Rp, // No se usa, ya que RecomendacionesMedicas contiene la info
      RecomendacionesMedicas: consulta.RecomendacionesMedicas,
      proximoControl: formatDateToSpanish(consulta.ProximoControl),
      observaciones: consulta.Observaciones,
    };
    exportToWord(datosReceta, "RecipeMedico.docx");
  };

  // Manejador FormulaLentes.docx

  const handleExportToFormulaLentes = async () => {
    if (!paciente) {
      window.alert("No hay información de paciente para exportar.");
      return;
    }
    if (historiaMedica.length === 0) {
      window.alert("No hay consultas disponibles para generar la fórmula de lentes.");
      return;
    }
  
    const consulta = historiaMedica[selectedConsultaIndex];
  
    // Función para calcular la edad en años
    const calculateAge = (birthDateStr) => {
      if (!birthDateStr) return "";
      const birthDate = new Date(birthDateStr);
      const now = new Date();
      let years = now.getFullYear() - birthDate.getFullYear();
      if (
        now.getMonth() < birthDate.getMonth() ||
        (now.getMonth() === birthDate.getMonth() && now.getDate() < birthDate.getDate())
      ) {
        years--; // Ajuste si aún no ha pasado el cumpleaños este año
      }
      return `${years} años`;
    };
  
    const datosFormulaLentes = {
      // Datos del paciente
      nombre: paciente.nombre,
      segundoNombre: paciente.segundoNombre,
      primerApellido: paciente.primerApellido,
      segundoApellido: paciente.segundoApellido,
      numeroDocumento: paciente.numeroDocumento,
      edad: calculateAge(paciente.fechaNacimiento), // Ahora solo muestra "X años"
  
      // Datos de la consulta
      FechaConsulta: formatDateForInput(consulta.FechaConsulta),
      LejosODEsfera: consulta.LejosODEsfera,
      LejosODCilindro: consulta.LejosODCilindro,
      LejosODEje: consulta.LejosODEje,
      LejosODAv: consulta.LejosODAv,
      LejosOIEsfera: consulta.LejosOIEsfera,
      LejosOICilindro: consulta.LejosOICilindro,
      LejosOIEje: consulta.LejosOIEje,
      LejosOIAv: consulta.LejosOIAv,
      CercaODADD: consulta.CercaODADD,
      CercaODAVCC: consulta.CercaODAVCC,
      CercaOIADD: consulta.CercaOIADD,
      CercaOIAVCC: consulta.CercaOIAVCC,
      TipoLente: consulta.TipoLente,
      AlturaLente: consulta.AlturaLente,
      DIP: consulta.DIP,
      Filtro: consulta.Filtro,
    };
  
    exportToWord(datosFormulaLentes, "FormulaLentes.docx");
  };
  
  
  

  return (
    <div>
      <h1>Historia Médica</h1>

      {/* Sección Buscar */}
      <section>
        <label>Buscar por Número de Cédula o Pasaporte:</label>
        <input
          type="text"
          value={buscarPacienteID}
          onChange={handleBuscarPaciente}
          placeholder="Ingrese el número de documento"
        />
        <button onClick={handleVerHistoria} className="menu-button">
          Buscar Paciente
        </button>
      </section>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {paciente && (
        <div>
          <h3>Información del Paciente:</h3>
          <p>
            <strong>Nombre:</strong>{" "}
            {paciente.nombre} {paciente.segundoNombre} {paciente.primerApellido}{" "}
            {paciente.segundoApellido}
          </p>
          <p>
            <strong>Número de Documento:</strong> {paciente.numeroDocumento}
          </p>
          <p>
            <strong>Dirección:</strong> {paciente.direccion}
          </p>
          <p>
            <strong>Sexo:</strong> {paciente.sexo}
          </p>
          <p>
            <strong>Fecha de Nacimiento:</strong>{" "}
            {formatDateForInput(paciente.fechaNacimiento)}
          </p>
          <p>
            <strong>Edad:</strong> {calculateAge(paciente.fechaNacimiento)}
          </p>
          
                  <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button onClick={handleExportToRecipeMedico} className="menu-button">
            Exportar Recipe Medico a Word
          </button>

          <button onClick={handleExportToWord} className="menu-button">
            Exportar Informe Medico a Word
          </button>

          <button onClick={handleExportToFormulaLentes} className="menu-button">
            Exportar Fórmula de Lentes a Word
          </button>
</div>

        </div>
      )}

      {/* Sección Historial Médico */}
      {paciente && historiaMedica.length > 0 && (
        <section>
          <h2>Historial Médico</h2>
          {historiaMedica.length > 1 && (
            <div>
              <label>Seleccione la fecha de la consulta:</label>
              <select onChange={(e) => setSelectedConsultaIndex(Number(e.target.value))}>
                {historiaMedica.map((consulta, index) => (
                  <option key={index} value={index}>
                    {formatDateForInput(consulta.FechaConsulta)}
                  </option>
                ))}
              </select>
              <button className="menu-button" onClick={() => setShowAll(!showAll)}>
                {showAll ? "Ver Una Consulta" : "Ver Todas las Consultas"}
              </button>
            </div>
          )}
          {showAll
            ? historiaMedica.map((consulta, index) => (
                <div key={index}>{renderConsulta(consulta)}</div>
              ))
            : renderConsulta(historiaMedica[selectedConsultaIndex])}
        </section>
      )}

      {/* Sección Ingresar Nueva Historia Médica */}
      {paciente && (
        <section>
          <h2>Ingresar Nueva Historia Médica</h2>
          <form onSubmit={handleSubmit}>
            <label>Paciente:</label>
            <input type="text" name="PacienteID" value={formData.PacienteID} disabled />

            <label>Fecha de Consulta:</label>
            <input
              type="date"
              name="FechaConsulta"
              value={formatDateForInput(formData.FechaConsulta)}
              onChange={handleChange}
            />

            <label>Motivo de la Consulta:</label>
            <input
              type="text"
              name="MotivoConsulta"
              value={formData.MotivoConsulta}
              onChange={handleChange}
            />

            <label>Diagnóstico:</label>
            <input type="text" name="Diagnostico" value={formData.Diagnostico} onChange={handleChange} />

            <label>Tratamiento:</label>
            <input type="text" name="Tratamiento" value={formData.Tratamiento} onChange={handleChange} />

            {/* Sección para ingresar medicamentos y agregarlos a Recomendaciones Médicas */}
            <fieldset style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
              <legend>Agregar Medicamento</legend>
              <label>Nombre del Medicamento:</label>
              <input
                type="text"
                name="nombre"
                value={medTemp.nombre}
                onChange={handleMedChange}
              />

              <label>Concentración:</label>
              <input
                type="text"
                name="concentracion"
                value={medTemp.concentracion}
                onChange={handleMedChange}
              />

              <label>Vía de Administración:</label>
              <input
                type="text"
                name="via"
                list="viaOptions"
                value={medTemp.via}
                onChange={handleMedChange}
                placeholder="Ej. gotas, ampollas..."
              />
              <datalist id="viaOptions">
                <option value="gotas" />
                <option value="ampollas" />
                <option value="tabletas" />
                <option value="inyectable" />
              </datalist>

              <label>Frecuencia:</label>
              <input
                type="text"
                name="frecuencia"
                list="frecuenciaOptions"
                value={medTemp.frecuencia}
                onChange={handleMedChange}
                placeholder="Ej. Cada 8 horas"
              />
              <datalist id="frecuenciaOptions">
                <option value="Cada 8 horas" />
                <option value="Cada 12 horas" />
                <option value="Cada 24 horas" />
              </datalist>

              <label>Duración:</label>
              <input
                type="text"
                name="duracion"
                value={medTemp.duracion}
                onChange={handleMedChange}
                placeholder="Ej. 7"
              />

              <label>Unidad de Duración:</label>
              <input
                type="text"
                name="unidad"
                list="unidadOptions"
                value={medTemp.unidad}
                onChange={handleMedChange}
                placeholder="Seleccione o ingrese"
              />
              <datalist id="unidadOptions">
                <option value="horas" />
                <option value="días" />
                <option value="semanas" />
                <option value="mes" />
              </datalist>

              <button type="button" onClick={handleAddMedicamento}>
                Agregar Medicamento
              </button>
            </fieldset>

            <label>Antecedentes Familiares:</label>
            <input
              type="text"
              name="AntecedentesFamiliares"
              value={formData.AntecedentesFamiliares}
              onChange={handleChange}
            />

            <label>Enfermedades Oculares Previas:</label>
            <input
              type="text"
              name="EnfermedadesOcularesPrevias"
              value={formData.EnfermedadesOcularesPrevias}
              onChange={handleChange}
            />

            <label>Prescripción de Lentes:</label>
            <input
              type="text"
              name="PrescripcionLentes"
              value={formData.PrescripcionLentes}
              onChange={handleChange}
            />

            <label>Uso de Lentes de Contacto:</label>
            <input
              type="text"
              name="UsoLentesContacto"
              value={formData.UsoLentesContacto}
              onChange={handleChange}
            />

            <label>Cirugías Oculares Previas:</label>
            <input
              type="text"
              name="CirugiasOcularesPrevias"
              value={formData.CirugiasOcularesPrevias}
              onChange={handleChange}
            />

            <label>Examen Visual:</label>
            <input
              type="text"
              name="ExamenVisual"
              value={formData.ExamenVisual}
              onChange={handleChange}
            />

            <label>Presión Ocular:</label>
            <input
              type="text"
              name="PresionOcular"
              value={formData.PresionOcular}
              onChange={handleChange}
            />

            <label>Campo Visual:</label>
            <input
              type="text"
              name="CampoVisual"
              value={formData.CampoVisual}
              onChange={handleChange}
            />

            <label>Fondo de Ojo:</label>
            <input
              type="text"
              name="FondoDeOjo"
              value={formData.FondoDeOjo}
              onChange={handleChange}
            />

            <label>Tratamientos Previos:</label>
            <input
              type="text"
              name="TratamientosPrevios"
              value={formData.TratamientosPrevios}
              onChange={handleChange}
            />

            <label>Medicamentos Recetados:</label>
            <input
              type="text"
              name="MedicamentosRecetados"
              value={formData.MedicamentosRecetados}
              onChange={handleChange}
            />

            <label>Recomendaciones Médicas:</label>
            <input
              type="text"
              name="RecomendacionesMedicas"
              value={formData.RecomendacionesMedicas}
              onChange={handleChange}
            />

            <label>Próximo Control:</label>
            <input
              type="date"
              name="ProximoControl"
              value={formatDateForInput(formData.ProximoControl)}
              onChange={handleChange}
            />

            <label>Tomografía de Retina:</label>
            <input
              type="text"
              name="TomografiaRetina"
              value={formData.TomografiaRetina}
              onChange={handleChange}
            />

            <label>Ecografía Ocular:</label>
            <input
              type="text"
              name="EcografiaOcular"
              value={formData.EcografiaOcular}
              onChange={handleChange}
            />

            <label>Ojo Derecho Estado:</label>
            <input
              type="text"
              name="OjoDerechoEstado"
              value={formData.OjoDerechoEstado}
              onChange={handleChange}
            />

            <label>Ojo Izquierdo Estado:</label>
            <input
              type="text"
              name="OjoIzquierdoEstado"
              value={formData.OjoIzquierdoEstado}
              onChange={handleChange}
            />

            <label>Nivel de Dolor:</label>
            <input
              type="text"
              name="NivelDolor"
              value={formData.NivelDolor}
              onChange={handleChange}
            />
        <h2>Fórmula  de Lentes</h2>
            {/* Datos del Ojo Derecho */}
            <h3>Ojo Derecho</h3>

            <label>Lejos OD Esfera:</label>
            <input
              type="text"
              name="LejosODEsfera"
              value={formData.LejosODEsfera}
              onChange={handleChange}
            />

            <label>Lejos OD Cilindro:</label>
            <input
              type="text"
              name="LejosODCilindro"
              value={formData.LejosODCilindro}
              onChange={handleChange}
            />

            <label>Lejos OD Eje:</label>
            <input
              type="text"
              name="LejosODEje"
              value={formData.LejosODEje}
              onChange={handleChange}
            />

            <label>Lejos OD AV:</label>
            <input
              type="text"
              name="LejosODAv"
              value={formData.LejosODAv}
              onChange={handleChange}
            />

            <label>Cerca OD ADD:</label>
            <input
              type="text"
              name="CercaODADD"
              value={formData.CercaODADD}
              onChange={handleChange}
            />

            <label>Cerca OD AVCC:</label>
            <input
              type="text"
              name="CercaODAVCC"
              value={formData.CercaODAVCC}
              onChange={handleChange}
            />

            {/* Datos del Ojo Izquierdo */}
            <h3>Ojo Izquierdo</h3>

            <label>Lejos OI Esfera:</label>
            <input
              type="text"
              name="LejosOIEsfera"
              value={formData.LejosOIEsfera}
              onChange={handleChange}
            />

            <label>Lejos OI Cilindro:</label>
            <input
              type="text"
              name="LejosOICilindro"
              value={formData.LejosOICilindro}
              onChange={handleChange}
            />

            <label>Lejos OI Eje:</label>
            <input
              type="text"
              name="LejosOIEje"
              value={formData.LejosOIEje}
              onChange={handleChange}
            />

            <label>Lejos OI AV:</label>
            <input
              type="text"
              name="LejosOIAv"
              value={formData.LejosOIAv}
              onChange={handleChange}
            />

            <label>Cerca OI ADD:</label>
            <input
              type="text"
              name="CercaOIADD"
              value={formData.CercaOIADD}
              onChange={handleChange}
            />

            <label>Cerca OI AVCC:</label>
            <input
              type="text"
              name="CercaOIAVCC"
              value={formData.CercaOIAVCC}
              onChange={handleChange}
            />

            {/* Configuración de Lente */}
            <h3>Configuración de Lente</h3>

            <label>Tipo de Lente:</label>
            <select name="TipoLente" value={formData.TipoLente} onChange={handleChange}>
              <option value="">Seleccione una opción</option>
              <option value="Visión sencilla">Visión sencilla</option>
              <option value="Bifocal">Bifocal</option>
              <option value="Multifocal">Multifocal</option>
              <option value="Alto índice">Alto índice</option>
              <option value="Otros">Otros</option>
            </select>

            <label>Altura del Lente:</label>
            <input
              type="text"
              name="AlturaLente"
              value={formData.AlturaLente}
              onChange={handleChange}
            />

            <label>DIP:</label>
            <input
              type="text"
              name="DIP"
              value={formData.DIP}
              onChange={handleChange}
            />

            <label>Filtro:</label>
            <select name="Filtro" value={formData.Filtro} onChange={handleChange}>
              <option value="">Seleccione una opción</option>
              <option value="Antireflejo">Antireflejo</option>
              <option value="Filtro azul">Filtro azul</option>
              <option value="Fotosensible">Fotosensible</option>
              <option value="Otros">Otros</option>
            </select>


            <label>Observaciones:</label>
            <textarea
              name="Observaciones"
              value={formData.Observaciones}
              onChange={handleChange}
              onInput={handleAutoResize}
              style={{ resize: "none", width: "100%", overflow: "hidden" }}
            />

            <button type="submit">Registrar Consulta</button>
          </form>
        </section>
      )}
    </div>
  );
};

export default HistoriaMedica;
