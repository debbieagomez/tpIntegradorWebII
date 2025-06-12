const express = require('express');
const router = express.Router();
const internacionController = require('../controller/internacionController');

router.get('/', internacionController.listarInternaciones);
router.get('/nueva', internacionController.nuevaInternacion);
router.post('/crear', internacionController.crearInternacion);
router.get('/:id', internacionController.verInternacion);
router.post('/:id/finalizar', internacionController.finalizarInternacion);

module.exports = router;

// Exportar el router para usarlo en el servidor principal