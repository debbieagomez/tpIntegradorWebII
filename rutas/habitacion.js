const express = require('express');
const router = express.Router();
const habitacionController = require('../controller/habitacionController');

router.get('/', habitacionController.listarHabitaciones);
router.get('/nueva', habitacionController.nuevaHabitacion);
router.post('/nueva', habitacionController.crearHabitacion);
router.get('/:id', habitacionController.verHabitacion);
router.post('/:id/editar', habitacionController.actualizarHabitacion);
router.post('/:id/eliminar', habitacionController.eliminarHabitacion);

module.exports = router;

// Exportar el router para usarlo en el servidor principal