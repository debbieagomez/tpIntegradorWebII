const express = require ('express');
const router = express.Router();
const camaController = require('../controller/camaController');

router.get('/', camaController.listarCamas);
router.get('/disponibles', camaController.listarCamasDisponibles);
router.get('/nueva', camaController.nuevaCama);
router.post('/crear', camaController.crearCama);
router.get('/:id', camaController.verCama);
router.post('/:id/editar', camaController.actualizarCama);
router.post('/:id/eliminar', camaController.eliminarCama);

module.exports = router;

// Exportar el router para usarlo en el servidor principal