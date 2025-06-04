const express = require('express');
const router = express.Router();
const habitacionController = require('../controller/habitacionController');
// Rutas para habitaciones

router.get('/', habitacionController.listarHabitaciones); // Listar todas las habitaciones
router.get('/disponibles', habitacionController.listarHabitacionesDisponibles); // Listar habitaciones disponibles
router.get('/:id', habitacionController.verHabitacion); // Ver detalles de una habitación específica
router.post('/', habitacionController.crearHabitacion); // Crear una nueva habitación
router.post('/:id/editar', habitacionController.actualizarHabitacion); // Actualizar una habitación específica
router.post('/:id/eliminar', habitacionController.eliminarHabitacion); // Eliminar una habitación específica
module.exports = router;
// Exportar el router para usarlo en el servidor principal