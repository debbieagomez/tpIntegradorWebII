const express = require('express');
const router = express.Router();
const internacionController = require('../controller/internacionController');

// Rutas para internaciones
router.get('/', internacionController.listarInternaciones); // Listar todas las internaciones
router.get('/disponibles', internacionController.listarInternacionesDisponibles); // Listar internaciones disponibles
router.get('/:id', internacionController.verInternacion); // Ver detalles de una internación específica
router.post('/', internacionController.crearInternacion); // Crear una nueva internación
router.post('/:id/editar', internacionController.actualizarInternacion); // Actualizar una internación específica
router.post('/:id/eliminar', internacionController.eliminarInternacion); // Eliminar una internación específica
module.exports = router;
// Exportar el router para usarlo en el servidor principal