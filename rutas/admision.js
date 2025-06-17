const express = require ('express');
const router = express.Router();
const admisionController = require('../controller/admisionController');

router.get('/', admisionController.listarAdmisiones);
router.get('/nueva', admisionController.nuevaAdmision);
router.post('/crear', admisionController.crearAdmision);
router.get('/:id', admisionController.verAdmision);
router.post('/:id/editar', admisionController.actualizarAdmision);
router.post('/:id/eliminar', admisionController.eliminarAdmision);

module.exports = router;

// Exportar el router para usarlo en el servidor principal
