// backend/routes/medicoRoutes.js
const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoController');

// Registrar un médico
router.post('/', medicoController.registerMedico);

// Obtener todos los médicos
router.get('/', medicoController.getAllMedicos);

// Obtener un médico específico por ID
router.get('/:id', medicoController.getMedico);

// Actualizar un médico
router.put('/:id', medicoController.updateMedico);

// Eliminar un médico
router.delete('/:id', medicoController.deleteMedico);

module.exports = router;
