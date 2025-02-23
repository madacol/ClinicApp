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
Rp.: ${consulta.Rp}
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
Indicaciones: ${consulta.Indicaciones}
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
    Indicaciones: "",
    ProximoControl: "",
    TomografiaRetina: "",
    EcografiaOcular: "",
    OjoDerechoEstado: "",
    OjoIzquierdoEstado: "",
    NivelDolor: "",
    Observaciones: "",
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

  // Agregar medicamento: se concatena la información al campo "Indicaciones" con un salto de línea
  const handleAddMedicamento = () => {
    if (!medTemp.nombre) {
      window.alert("Ingrese el nombre del medicamento");
      return;
    }
    const medString = `Medicamento: ${medTemp.nombre}; Concentración: ${medTemp.concentracion}; Vía: ${medTemp.via}; Frecuencia: ${medTemp.frecuencia}; Duración: ${medTemp.duracion} ${medTemp.unidad}`;
    setFormData((prev) => ({
      ...prev,
      Indicaciones: prev.Indicaciones
        ? `${prev.Indicaciones}\n${medString}`
        : medString,
    }));
    // Limpiar el formulario temporal
    setMedTemp({
      nombre: "",
      concentracion: "",
      via: "",
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
    const dataToSend = {
      ...formData,
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
            Indicaciones: "",
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
        <strong>Rp.:</strong> {consulta.Rp}
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
        <strong>Indicaciones:</strong> {consulta.Indicaciones}
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
  const handleExportToWord = async () => {
    if (!paciente) {
      window.alert("No hay información de paciente para exportar.");
      return;
    }
    const datosInforme = {
      nombre: `${paciente.nombre} ${paciente.segundoNombre} ${paciente.primerApellido} ${paciente.segundoApellido}`,
      numeroDocumento: paciente.numeroDocumento,
      direccion: paciente.direccion,
      sexo: paciente.sexo,
      fechaNacimiento: formatDateForInput(paciente.fechaNacimiento),
      edad: calculateAge(paciente.fechaNacimiento),
      historial: historiaMedica
        .map((consulta, index) => generateConsultaText(consulta, index))
        .join("\n\n"),
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
    // Para la receta, se utiliza el contenido ya concatenado en Indicaciones
    const datosReceta = {
      nombre: `${paciente.nombre} ${paciente.segundoNombre} ${paciente.primerApellido} ${paciente.segundoApellido}`,
      numeroDocumento: paciente.numeroDocumento,
      direccion: paciente.direccion,
      fechaConsulta: formatDateForInput(consulta.FechaConsulta),
      Rp: consulta.Rp, // No se usa, ya que Indicaciones contiene la info
      Indicaciones: consulta.Indicaciones,
      proximoControl: formatDateForInput(consulta.ProximoControl),
      observaciones: consulta.Observaciones,
    };
    exportToWord(datosReceta, "RecipeMedico.docx");
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
          <button onClick={handleExportToWord} className="menu-button">
            Exportar Informe Medico a Word
          </button>
          <button
            onClick={handleExportToRecipeMedico}
            className="menu-button"
            style={{ marginLeft: "1rem" }}
          >
            Exportar Recipe Medico a Word
          </button>
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

            {/* Sección para ingresar medicamentos y agregarlos a Indicaciones */}
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

            <label>Indicaciones:</label>
            <input
              type="text"
              name="Indicaciones"
              value={formData.Indicaciones}
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
