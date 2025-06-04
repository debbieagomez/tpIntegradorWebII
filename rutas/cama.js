const express = require('express');
const router = express.Router();
const camaController = require('../controller/camaController');

router.get('/', camaController.listarCamas);
router.get('/disponibles', camaController.listarCamasDisponibles);
router.get('/:id', camaController.verCama);
router.post('/', camaController.crearCama);
router.post('/:id/editar', camaController.actualizarCama);
router.post('/:id/eliminar', camaController.eliminarCama);

module.exports = router;
// Exportar el router para usarlo en el servidor principal