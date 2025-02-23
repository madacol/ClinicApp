// backend/models/pacienteModel.js

class Paciente {
    constructor({
      nombre,
      segundoNombre = "",
      primerApellido,
      segundoApellido = "",
      sexo,
      fechaNacimiento,
      tipoDocumento = "Cedula", // Valor por defecto: "Cedula"
      numeroDocumento,
      nacionalidad = "V",       // Valor por defecto: "Venezolano"
      estadoResidencia = "Distrito Capital", // Valor por defecto
      ciudad = "",
      direccion = "",
      telefono,
      correo = "",
      modoPago = "Particular",  // Valor por defecto: "Particular"
      seguro = ""
    }) {
      // Datos personales
      this.nombre = nombre;
      this.segundoNombre = segundoNombre;
      this.primerApellido = primerApellido;
      this.segundoApellido = segundoApellido;
      this.sexo = sexo;
      this.fechaNacimiento = fechaNacimiento;
  
      // Información de identificación
      this.tipoDocumento = tipoDocumento;
      this.numeroDocumento = numeroDocumento;
      this.nacionalidad = nacionalidad;
  
      // Domicilio
      this.estadoResidencia = estadoResidencia;
      this.ciudad = ciudad;
      this.direccion = direccion;
  
      // Contacto
      this.telefono = telefono;
      this.correo = correo;
  
      // Información adicional
      this.modoPago = modoPago;
      this.seguro = seguro;
    }
  
    // Puedes agregar métodos para validar o transformar datos si lo requieres.
    validarDatos() {
      // Ejemplo de validación: asegurarse de que los campos obligatorios no estén vacíos.
      if (!this.nombre || !this.primerApellido || !this.sexo || !this.fechaNacimiento || !this.numeroDocumento || !this.telefono) {
        throw new Error("Faltan campos obligatorios");
      }
      // Otras validaciones según tu lógica de negocio.
    }
  }
  
  module.exports = Paciente;
  