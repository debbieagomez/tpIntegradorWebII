const express = require('express');
const router = express.Router();
const pacienteController = require('../controller/pacienteController');



router.get('/', pacienteController.listarPacientes);
router.get('/nuevo', pacienteController.nuevoPaciente);
router.post('/nuevo', pacienteController.crearPaciente);
router.get('/:id', pacienteController.verPaciente);
router.get('/:id/editar', pacienteController.editarPaciente);
router.post('/:id/editar', pacienteController.actualizarPaciente);
router.post('/:id/eliminar', pacienteController.eliminarPaciente);
router.get('/con-seguro', pacienteController.listarPacientesConSeguro);
router.get('/sin-seguro', pacienteController.listarPacientesSinSeguro);


module.exports = router;
