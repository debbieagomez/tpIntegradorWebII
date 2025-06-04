const{
    agregarHabitacion,
    actualizarHabitacion,
    obtenerHabitaciones,
    obtenerHabitacionPorId,
    obtenerHabitacionesDisponibles,
    eliminarHabitacionPorId,
} = require('../modelo/habitacion');
const { pacientes } = require('../modelo/paciente');

// Controlador para manejar las operaciones relacionadas con las habitaciones
class HabitacionController {
    // Listar todas las habitaciones
    static listarHabitaciones(req, res) {
        const habitaciones = obtenerHabitaciones();
        res.render('habitacion/listar', { habitaciones });
    }

    // Ver detalles de una habitación específica
    static verHabitacion(req, res) {
        const habitacionId = parseInt(req.params.id);
        const habitacion = obtenerHabitacionPorId(habitacionId);
        if (!habitacion) return res.status(404).send('Habitación no encontrada');
        res.render('habitacion/detalle', { habitacion });
    }

    // Crear una nueva habitación
    static crearHabitacion(req, res) {
        const { numero, tipo, disponible } = req.body;
        const nuevaHabitacion = agregarHabitacion({ numero, tipo, disponible: disponible === 'on' });
        res.redirect('/habitaciones');
    }

    // Actualizar una habitación existente
    static actualizarHabitacion(req, res) {
        const habitacionId = parseInt(req.params.id);
        const { numero, tipo, disponible } = req.body;
        const habitacionActualizada = actualizarHabitacion(habitacionId, { numero, tipo, disponible: disponible === 'on' });
        if (!habitacionActualizada) return res.status(404).send('Habitación no encontrada');
        res.redirect(`/habitaciones/${habitacionId}`);
    }

    // Eliminar una habitación
    static eliminarHabitacion(req, res) {
        const habitacionId = parseInt(req.params.id);
        const habitacionEliminada = eliminarHabitacionPorId(habitacionId);
        if (!habitacionEliminada) return res.status(404).send('Habitación no encontrada');
        res.redirect('/habitaciones');
    }
    // Listar habitaciones disponibles
    static listarHabitacionesDisponibles(req, res) {
        const habitacionesDisponibles = obtenerHabitacionesDisponibles();
        res.render('habitacion/disponibles', { habitaciones: habitacionesDisponibles });
    }
    // Ver habitaciones de un paciente específico
    static verHabitacionesPaciente(req, res) {
        const pacienteId = parseInt(req.params.id);
        const paciente = pacientes.find(p => p.id === pacienteId);
        if (!paciente) return res.status(404).send('Paciente no encontrado');

        res.render('habitacion/paciente', { paciente, habitaciones: [] });
    }



}
module.exports = HabitacionController;