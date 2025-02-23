// backend/routes/historiaRoutes.js
const express = require('express');
const router = express.Router();

const historiaController = require('../controllers/historiaController');

// Endpoint para registrar una nueva consulta en la historia médica
router.post('/', historiaController.registerConsulta);

// Endpoint para obtener la historia médica de un paciente por su ID
router.get('/:pacienteId', historiaController.getHistoriaByPaciente);

// Endpoint para actualizar una consulta en la historia médica
router.put('/:consultaId', historiaController.updateConsulta);

module.exports = router;
