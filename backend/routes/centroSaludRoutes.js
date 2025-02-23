// backend/routes/centroSaludRoutes.js
const express = require('express');
const router = express.Router();

const centroSaludController = require('../controllers/centroSaludController');

// Registrar un nuevo centro de salud
router.post('/', centroSaludController.registerCentroSalud);

// Obtener un centro de salud por ID
router.get('/:id', centroSaludController.getCentroSalud);

// Obtener todos los centros de salud
router.get('/', centroSaludController.getAllCentrosSalud);

// Actualizar un centro de salud
router.put('/:id', centroSaludController.updateCentroSalud);

// Eliminar un centro de salud
router.delete('/:id', centroSaludController.deleteCentroSalud);

module.exports = router;
