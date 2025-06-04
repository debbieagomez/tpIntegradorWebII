const express = require('express');
const router = express.Router();
const PacienteController = require('../controller/pacienteController');

// Verifica que el controlador se haya importado correctamente
if (!PacienteController) {
  console.error('Error: PacienteController no se ha importado correctamente.');
}

// Rutas válidas
router.get('/', PacienteController.listarPacientes);
router.get('/nuevo', PacienteController.nuevoPaciente);
router.post('/nuevo', PacienteController.crearPaciente);
router.get('/:id', PacienteController.verPaciente);
router.get('/:id/editar', PacienteController.editarPaciente);
router.post('/:id/editar', PacienteController.actualizarPaciente);
router.post('/:id/eliminar', PacienteController.eliminarPaciente);
router.get('/buscar', PacienteController.buscarPacientes);

// Estas funciones existen en el controlador:
router.get('/:id/historial', PacienteController.verHistorialPaciente);
router.get('/:id/internaciones', PacienteController.verInternacionesPaciente);
router.get('/:id/habitaciones', PacienteController.verHabitacionesPaciente);
router.get('/:id/consultas', PacienteController.verConsultasPaciente);
router.get('/:id/tratamientos', PacienteController.verTratamientosPaciente);
router.get('/:id/medicamentos', PacienteController.verMedicamentosPaciente);
router.get('/:id/resultados', PacienteController.verResultadosPaciente);
router.get('/:id/citas', PacienteController.verCitasPaciente);
router.get('/:id/facturas', PacienteController.verFacturasPaciente);
router.get('/:id/documentos', PacienteController.verDocumentosPaciente);

module.exports = router;