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
router.get('/buscar', pacienteController.buscarPacientes);

router.get('/:id/historial', pacienteController.verHistorialPaciente);
router.get('/:id/internaciones', pacienteController.verInternacionesPaciente);
router.get('/:id/habitaciones', pacienteController.verHabitacionesPaciente);
router.get('/:id/consultas', pacienteController.verConsultasPaciente);
router.get('/:id/tratamientos', pacienteController.verTratamientosPaciente);
router.get('/:id/medicamentos', pacienteController.verMedicamentosPaciente);
router.get('/:id/resultados', pacienteController.verResultadosPaciente);
router.get('/:id/citas', pacienteController.verCitasPaciente);
router.get('/:id/facturas', pacienteController.verFacturasPaciente);
router.get('/:id/documentos', pacienteController.verDocumentosPaciente);

module.exports = router;
