// backend/models/historiaModel.js

class HistoriaMedica {
    constructor({
      id, // Opcional: se asigna automáticamente (por ejemplo, autoincremental en la BD)
      pacienteID,
      fechaConsulta,
      motivoConsulta,
      diagnostico = "",
      tratamiento = "",
      antecedentesFamiliares = "",
      enfermedadesOcularesPrevias = "",
      prescripcionLentes = "",
      usoLentesContacto = "",
      cirugiasOcularesPrevias = "",
      examenVisual = "",
      presionOcular = "",
      campoVisual = "",
      fondoDeOjo = "",
      tratamientosPrevios = "",
      medicamentosRecetados = "",
      recomendacionesMedicas = "",
      proximoControl = "",
      tomografiaRetina = "",
      ecografiaOcular = "",
      ojoDerechoEstado = "",
      ojoIzquierdoEstado = "",
      nivelDolor = "",
      observaciones = ""
    }) {
      this.id = id;
      this.pacienteID = pacienteID;
      this.fechaConsulta = fechaConsulta;
      this.motivoConsulta = motivoConsulta;
      this.diagnostico = diagnostico;
      this.tratamiento = tratamiento;
      this.antecedentesFamiliares = antecedentesFamiliares;
      this.enfermedadesOcularesPrevias = enfermedadesOcularesPrevias;
      this.prescripcionLentes = prescripcionLentes;
      this.usoLentesContacto = usoLentesContacto;
      this.cirugiasOcularesPrevias = cirugiasOcularesPrevias;
      this.examenVisual = examenVisual;
      this.presionOcular = presionOcular;
      this.campoVisual = campoVisual;
      this.fondoDeOjo = fondoDeOjo;
      this.tratamientosPrevios = tratamientosPrevios;
      this.medicamentosRecetados = medicamentosRecetados;
      this.recomendacionesMedicas = recomendacionesMedicas;
      this.proximoControl = proximoControl;
      this.tomografiaRetina = tomografiaRetina;
      this.ecografiaOcular = ecografiaOcular;
      this.ojoDerechoEstado = ojoDerechoEstado;
      this.ojoIzquierdoEstado = ojoIzquierdoEstado;
      this.nivelDolor = nivelDolor;
      this.observaciones = observaciones;
    }
  
    // Método de validación básico
    validarDatos() {
      if (!this.pacienteID || !this.fechaConsulta || !this.motivoConsulta) {
        throw new Error("PacienteID, FechaConsulta y MotivoConsulta son obligatorios.");
      }
      // Puedes agregar otras validaciones según la lógica de tu negocio.
    }
  }
  
  module.exports = HistoriaMedica;
  