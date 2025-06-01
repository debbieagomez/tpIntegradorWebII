const express = require('express');
const router = express.Router();

const PacienteController = require('../controllers/pacienteController');
// Rutas para pacientes

router.get('/', PacienteController.listarPacientes); // Listar pacientes
router.get('/nuevo', PacienteController.nuevoPaciente); // Formulario para nuevo paciente
router.post('/nuevo', PacienteController.crearPaciente); // Crear nuevo paciente
router.get('/:id', PacienteController.verPaciente); // Ver detalles de un paciente
router.get('/:id/editar', PacienteController.editarPaciente); // Formulario para editar paciente
router.post('/:id/editar', PacienteController.actualizarPaciente); // Actualizar paciente
router.post('/:id/eliminar', PacienteController.eliminarPaciente); // Eliminar paciente
router.get('/:id/historial', PacienteController.verHistorial); // Ver historial médico del paciente
router.get('/:id/recetas', PacienteController.verRecetas); // Ver recetas del paciente
router.get('/:id/internaciones', PacienteController.verInternaciones); // Ver internaciones del paciente
router.get('/:id/admision', PacienteController.verAdmision); // Ver admisión del paciente
router.get('/:id/habitaciones', PacienteController.verHabitaciones); // Ver habitaciones del paciente
router.get('/:id/camas', PacienteController.verCamas); // Ver camas del paciente
