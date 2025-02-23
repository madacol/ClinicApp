// backend/routes/pacienteRoutes.js
const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

// POST para registrar un nuevo paciente
router.post('/', pacienteController.registerPatient);

// GET para obtener un paciente por número de documento (se utiliza :id)
router.get('/:id', pacienteController.getPatient);

// GET para obtener todos los pacientes
router.get('/', pacienteController.getAllPatients);

// PUT para actualizar los datos de un paciente por ID
router.put('/:id', pacienteController.updatePatient);

// DELETE para eliminar un paciente por ID
router.delete('/:id', pacienteController.deletePatient);

module.exports = router;
