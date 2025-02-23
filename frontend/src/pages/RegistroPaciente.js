// src/pages/RegistroPaciente.js
import React, { useState } from 'react';
import axios from 'axios';

// Función para formatear la fecha al formato "YYYY-MM-DD"
const formatDateForInput = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toISOString().split('T')[0];
};

const RegistroPaciente = () => {
  const initialFormData = {
    nombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    sexo: "",
    fechaNacimiento: "",
    tipoDocumento: "Cedula",
    numeroDocumento: "",
    nacionalidad: "V",
    estadoResidencia: "Distrito Capital",
    ciudad: "",
    direccion: "",
    telefono: "",
    correo: "",
    modoPago: "Particular",
    seguro: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const [mensaje, setMensaje] = useState("");
  const [searchDocumento, setSearchDocumento] = useState("");
  const [searchedPaciente, setSearchedPaciente] = useState(null);

  // Manejo de cambios en cualquier input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Buscar paciente por número de documento (GET /api/pacientes/:id)
  const handleSearch = async () => {
    if (!searchDocumento) {
      setMensaje("Ingrese un número de documento para buscar");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/pacientes/${searchDocumento}`);
      setSearchedPaciente(response.data);
      setMensaje("");
      // Cargar la información en el formulario para posibles actualizaciones
      setFormData(response.data);
    } catch (error) {
      console.error("Error al buscar paciente:", error);
      setMensaje("Paciente no encontrado");
      setSearchedPaciente(null);
    }
  };

  // Registrar paciente (POST /api/pacientes)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convertir fechaNacimiento al formato "YYYY-MM-DD"
      const dataToSend = {
        ...formData,
        fechaNacimiento: formatDateForInput(formData.fechaNacimiento)
      };
      const response = await axios.post('http://localhost:5000/api/pacientes', dataToSend);
      setMensaje(response.data.message || "Paciente registrado con éxito");
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error registrando paciente:", error);
      setMensaje("Error al registrar el paciente");
    }
  };

  // Actualizar paciente (PUT /api/pacientes/:id)
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!searchedPaciente || !searchedPaciente.id) {
      setMensaje("No hay paciente seleccionado para actualizar");
      return;
    }
    try {
      const dataToSend = {
        ...formData,
        fechaNacimiento: formatDateForInput(formData.fechaNacimiento)
      };
      const response = await axios.put(`http://localhost:5000/api/pacientes/${searchedPaciente.id}`, dataToSend);
      setMensaje(response.data.message);
      setSearchedPaciente({ ...searchedPaciente, ...dataToSend });
    } catch (error) {
      console.error("Error al actualizar paciente:", error);
      setMensaje("Error al actualizar paciente");
    }
  };

  // Eliminar paciente (DELETE /api/pacientes/:id)
  const handleDelete = async () => {
    if (!searchedPaciente || !searchedPaciente.id) {
      setMensaje("No hay paciente seleccionado para eliminar");
      return;
    }
    const confirmar = window.confirm("¿Está seguro que desea eliminar este paciente?");
    if (!confirmar) return;
    try {
      const response = await axios.delete(`http://localhost:5000/api/pacientes/${searchedPaciente.id}`);
      setMensaje(response.data.message);
      setSearchedPaciente(null);
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error al eliminar paciente:", error);
      setMensaje("Error al eliminar paciente");
    }
  };

  return (
    <div>
      <h1>Registro de Paciente</h1>
      {mensaje && <p>{mensaje}</p>}

      {/* Sección Buscar */}
      <section>
        <h2>Buscar Paciente</h2>
        <input
          type="text"
          value={searchDocumento}
          onChange={(e) => setSearchDocumento(e.target.value)}
          placeholder="Ingrese el número de documento"
        />
        <button className="menu-button" onClick={handleSearch}>Buscar Paciente</button>
      </section>

      <hr />

      {/* Sección Registrar */}
      <section>
        <h2>Registrar Paciente</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

          <label>Segundo Nombre:</label>
          <input type="text" name="segundoNombre" value={formData.segundoNombre} onChange={handleChange} />

          <label>Primer Apellido:</label>
          <input type="text" name="primerApellido" value={formData.primerApellido} onChange={handleChange} required />

          <label>Segundo Apellido:</label>
          <input type="text" name="segundoApellido" value={formData.segundoApellido} onChange={handleChange} />

          <label>Sexo:</label>
          <select name="sexo" value={formData.sexo} onChange={handleChange} required>
            <option value="">Seleccione</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>

          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento ? formatDateForInput(formData.fechaNacimiento) : ""}
            onChange={handleChange}
            required
          />

          <label>Tipo de Documento:</label>
          <select name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange} required>
            <option value="">Seleccione</option>
            <option value="Cedula">Cédula de identidad</option>
            <option value="Pasaporte">Pasaporte</option>
          </select>

          <label>Número de Documento:</label>
          <input type="text" name="numeroDocumento" value={formData.numeroDocumento} onChange={handleChange} required />

          {formData.tipoDocumento === "Cedula" && (
            <>
              <label>Nacionalidad:</label>
              <select name="nacionalidad" value={formData.nacionalidad} onChange={handleChange} required>
                <option value="">Seleccione</option>
                <option value="V">Venezolano</option>
                <option value="E">Extranjero</option>
              </select>
            </>
          )}

          <label>Estado de Residencia:</label>
          <select name="estadoResidencia" value={formData.estadoResidencia} onChange={handleChange}>
            <option value="Distrito Capital">Distrito Capital</option>
            <option value="Amazonas">Amazonas</option>
            <option value="Anzoátegui">Anzoátegui</option>
            <option value="Apure">Apure</option>
            <option value="Aragua">Aragua</option>
            <option value="Barinas">Barinas</option>
            <option value="Bolívar">Bolívar</option>
            <option value="Carabobo">Carabobo</option>
            <option value="Cojedes">Cojedes</option>
            <option value="Delta Amacuro">Delta Amacuro</option>
            <option value="Falcón">Falcón</option>
            <option value="Guárico">Guárico</option>
            <option value="Lara">Lara</option>
            <option value="Mérida">Mérida</option>
            <option value="Miranda">Miranda</option>
            <option value="Monagas">Monagas</option>
            <option value="Nueva Esparta">Nueva Esparta</option>
            <option value="Portuguesa">Portuguesa</option>
            <option value="Sucre">Sucre</option>
            <option value="Táchira">Táchira</option>
            <option value="Trujillo">Trujillo</option>
            <option value="La Guaira">La Guaira</option>
            <option value="Yaracuy">Yaracuy</option>
            <option value="Zulia">Zulia</option>
          </select>

          <label>Ciudad:</label>
          <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} />

          <label>Dirección:</label>
          <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />

          <label>Teléfono:</label>
          <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} required />

          <label>Correo Electrónico:</label>
          <input type="email" name="correo" value={formData.correo} onChange={handleChange} />

          <label>Modo de Pago:</label>
          <select name="modoPago" value={formData.modoPago} onChange={handleChange}>
            <option value="">Seleccione</option>
            <option value="Particular">Particular</option>
            <option value="Seguro Médico">Seguro Médico</option>
          </select>

          {formData.modoPago === "Seguro Médico" && (
            <>
              <label>Seleccione el seguro:</label>
              <select name="seguro" value={formData.seguro} onChange={handleChange}>
                <option value="">Seleccione</option>
                <option value="Otro">Otro</option>
              </select>
            </>
          )}

          <button type="submit" className="menu-button">Registrar Paciente</button>
        </form>
      </section>

      <hr />

      {/* Sección Actualizar */}
      {searchedPaciente && (
        <section>
          <h2>Actualizar Datos del Paciente</h2>
          <form onSubmit={handleUpdate}>
            <label>Nombre:</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

            <label>Segundo Nombre:</label>
            <input type="text" name="segundoNombre" value={formData.segundoNombre} onChange={handleChange} />

            <label>Primer Apellido:</label>
            <input type="text" name="primerApellido" value={formData.primerApellido} onChange={handleChange} required />

            <label>Segundo Apellido:</label>
            <input type="text" name="segundoApellido" value={formData.segundoApellido} onChange={handleChange} />

            <label>Sexo:</label>
            <select name="sexo" value={formData.sexo} onChange={handleChange} required>
              <option value="">Seleccione</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>

            <label>Fecha de Nacimiento:</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento ? formatDateForInput(formData.fechaNacimiento) : ""}
              onChange={handleChange}
              required
            />

            <label>Tipo de Documento:</label>
            <select name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange} required>
              <option value="">Seleccione</option>
              <option value="Cedula">Cédula de identidad</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>

            <label>Número de Documento:</label>
            <input type="text" name="numeroDocumento" value={formData.numeroDocumento} onChange={handleChange} required />

            {formData.tipoDocumento === "Cedula" && (
              <>
                <label>Nacionalidad:</label>
                <select name="nacionalidad" value={formData.nacionalidad} onChange={handleChange} required>
                  <option value="">Seleccione</option>
                  <option value="V">Venezolano</option>
                  <option value="E">Extranjero</option>
                </select>
              </>
            )}

            <label>Estado de Residencia:</label>
            <select name="estadoResidencia" value={formData.estadoResidencia} onChange={handleChange}>
              <option value="Distrito Capital">Distrito Capital</option>
              <option value="Amazonas">Amazonas</option>
              <option value="Anzoátegui">Anzoátegui</option>
              <option value="Apure">Apure</option>
              <option value="Aragua">Aragua</option>
              <option value="Barinas">Barinas</option>
              <option value="Bolívar">Bolívar</option>
              <option value="Carabobo">Carabobo</option>
              <option value="Cojedes">Cojedes</option>
              <option value="Delta Amacuro">Delta Amacuro</option>
              <option value="Falcón">Falcón</option>
              <option value="Guárico">Guárico</option>
              <option value="Lara">Lara</option>
              <option value="Mérida">Mérida</option>
              <option value="Miranda">Miranda</option>
              <option value="Monagas">Monagas</option>
              <option value="Nueva Esparta">Nueva Esparta</option>
              <option value="Portuguesa">Portuguesa</option>
              <option value="Sucre">Sucre</option>
              <option value="Táchira">Táchira</option>
              <option value="Trujillo">Trujillo</option>
              <option value="La Guaira">La Guaira</option>
              <option value="Yaracuy">Yaracuy</option>
              <option value="Zulia">Zulia</option>
            </select>

            <label>Ciudad:</label>
            <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} />

            <label>Dirección:</label>
            <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />

            <label>Teléfono:</label>
            <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} required />

            <label>Correo Electrónico:</label>
            <input type="email" name="correo" value={formData.correo} onChange={handleChange} />

            <label>Modo de Pago:</label>
            <select name="modoPago" value={formData.modoPago} onChange={handleChange}>
              <option value="">Seleccione</option>
              <option value="Particular">Particular</option>
              <option value="Seguro Médico">Seguro Médico</option>
            </select>

            {formData.modoPago === "Seguro Médico" && (
              <>
                <label>Seleccione el seguro:</label>
                <select name="seguro" value={formData.seguro} onChange={handleChange}>
                  <option value="">Seleccione</option>
                  <option value="Otro">Otro</option>
                </select>
              </>
            )}

            <button type="submit" className="menu-button">Actualizar Paciente</button>
          </form>
        </section>
      )}

      <hr />

      {/* Sección Eliminar */}
      {searchedPaciente && (
        <section>
          <h2>Eliminar Paciente</h2>
          <button className="menu-button" onClick={handleDelete}>Eliminar Paciente</button>
        </section>
      )}
    </div>
  );
};

export default RegistroPaciente;
