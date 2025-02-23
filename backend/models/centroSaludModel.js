// backend/models/centroSaludModel.js

class CentroSalud {
    constructor({
      id, // Este valor se asignará automáticamente (por ejemplo, autoincremental en la BD)
      nombre,
      direccion,
      telefono = "",
      email = "",
      otrosDatos = {} // Para información adicional (por ejemplo, ubicación geográfica, horario de atención general, etc.)
    }) {
      this.id = id;
      this.nombre = nombre;
      this.direccion = direccion;
      this.telefono = telefono;
      this.email = email;
      this.otrosDatos = otrosDatos;
    }
  
    // Método de validación (opcional)
    validarDatos() {
      if (!this.nombre || !this.direccion) {
        throw new Error("El centro de salud debe tener nombre y dirección.");
      }
    }
  }
  
  module.exports = CentroSalud;
  