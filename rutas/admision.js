const express = require('express');
const router = express.Router();

const AdmisionController = require('../controller/admisionController');

// Rutas para admisiones
router.get('/', AdmisionController.listarAdmisiones); // Listar admisiones
router.get('/:id', AdmisionController.verAdmision); // Ver admisión de un paciente
router.post('/', AdmisionController.crearAdmision); // Crear nueva admisión
router.post('/:id/editar', AdmisionController.actualizarAdmision); // Actualizar admisión
router.post('/:id/eliminar', AdmisionController.eliminarAdmision); // Eliminar admisión de un paciente
module.exports = router;

// Exportar el router para usarlo en el servidor principal
// module.exports = router;