// backend/models/medicoModel.js

class Medico {
    constructor({
      id, // Este valor se asigna desde la base de datos (por ejemplo, un autoincremental)
      nombre,
      especialidades = [],
      asignaciones = [] // Array de asignaciones de horario
    }) {
      this.id = id;
      this.nombre = nombre;
      this.especialidades = especialidades;
      /* 
        Cada asignación es un objeto con:
        - fecha: "YYYY-MM-DD" o el día de la semana
        - centro: nombre del centro de salud
        - horaInicio: "HH:MM" (por ejemplo, "14:00")
        - horaFin: "HH:MM" (por ejemplo, "18:00")
      */
      this.asignaciones = asignaciones;
    }
  
    // Método de validación (opcional)
    validarDatos() {
      if (!this.nombre || !Array.isArray(this.especialidades) || this.especialidades.length === 0) {
        throw new Error("El médico debe tener un nombre y al menos una especialidad.");
      }
    }
  
    // Método para agregar una asignación de horario
    agregarAsignacion(asignacion) {
      // Se espera que 'asignacion' tenga las propiedades: fecha, centro, horaInicio y horaFin
      if (
        !asignacion.fecha ||
        !asignacion.centro ||
        !asignacion.horaInicio ||
        !asignacion.horaFin
      ) {
        throw new Error("La asignación debe incluir fecha, centro, horaInicio y horaFin.");
      }
      this.asignaciones.push(asignacion);
    }
  }
  
  module.exports = Medico;

  