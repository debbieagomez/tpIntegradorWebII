const {
    Internacion,
    paciente,
    obtenerInternaciones,
    obtenerInternacionPorId,
    agregarInternacion,
    actualizarInternacion,
    obtenerInternacionesDisponibles,
    eliminarInternacionPorId,
    obtenerInternacionesPorPaciente,
    eliminarInternacionesPorPaciente,
} = require('../modelo/internacion');
const { pacientes } = require('../modelo/paciente');

class InternacionController {
    // Listar todas las internaciones
    static listarInternaciones(req, res) {
        const internaciones = obtenerInternaciones();
        res.render('internacion/listar', { internaciones });
    }

    // Ver una internación específica
    static verInternacion(req, res) {
        const id = parseInt(req.params.id);
        const internacion = obtenerInternacionPorId(id);
        if (!internacion) return res.status(404).send('Internación no encontrada');
        res.render('internacion/detalle', { internacion });
    }

    // Crear una nueva internación
    static crearInternacion(req, res) {
        const { pacienteId, fechaIngreso, motivoIngreso } = req.body;
        const paciente = pacientes.find(p => p.id === parseInt(pacienteId));
        if (!paciente) return res.status(404).send('Paciente no encontrado');

        const nuevaInternacion = agregarInternacion({ pacienteId: paciente.id, fechaIngreso, motivoIngreso });
        res.redirect(`/internacion/${nuevaInternacion.id}`);
    }

    // Actualizar una internación específica
    static actualizarInternacion(req, res) {
        const id = parseInt(req.params.id);
        const { fechaIngreso, motivoIngreso } = req.body;

        const internacionActualizada = actualizarInternacion(id, { fechaIngreso, motivoIngreso });
        if (!internacionActualizada) return res.status(404).send('Internación no encontrada');

        res.redirect(`/internacion/${internacionActualizada.id}`);
    }

    // Eliminar una internación específica
    static eliminarInternacion(req, res) {
        const id = parseInt(req.params.id);
        const internacionEliminada = eliminarInternacionPorId(id);
        if (!internacionEliminada) return res.status(404).send('Internación no encontrada');

        res.redirect('/internacion');
    }
    // Listar internaciones disponibles
    static listarInternacionesDisponibles(req, res) {
        const internacionesDisponibles = obtenerInternacionesDisponibles();
        res.render('internacion/disponibles', { internaciones: internacionesDisponibles });
    }
    // Ver todas las internaciones de un paciente
    static verInternacionesPorPaciente(req, res) {
        const pacienteId = parseInt(req.params.id);
        const internacionesPaciente = obtenerInternacionesPorPaciente(pacienteId);
        const paciente = pacientes.find(p => p.id === pacienteId);

        if (!paciente) return res.status(404).send('Paciente no encontrado');

        res.render('internacion/ver', {
            paciente,
            internaciones: internacionesPaciente
        });
    }
    // Eliminar todas las internaciones de un paciente
    static eliminarInternacionesPorPaciente(req, res) {
        const pacienteId = parseInt(req.params.id);
        const internacionesEliminadas = eliminarInternacionesPorPaciente(pacienteId);
        if (!internacionesEliminadas) return res.status(404).send('No se encontraron internaciones para eliminar');

        res.redirect('/internacion');
    }
    // Crear una nueva internación para un paciente
    static crearInternacionPorPaciente(req, res) {
        const pacienteId = parseInt(req.params.id);
        const { fechaIngreso, motivoIngreso } = req.body;
        const paciente = pacientes.find(p => p.id === pacienteId);
        if (!paciente) return res.status(404).send('Paciente no encontrado');

        const nuevaInternacion = agregarInternacion({ pacienteId: paciente.id, fechaIngreso, motivoIngreso });
        res.redirect(`/internacion/${nuevaInternacion.id}`);
    }
    // Actualizar una internación específica de un paciente
    static actualizarInternacionPorPaciente(req, res) {
        const pacienteId = parseInt(req.params.id);
        const { fechaIngreso, motivoIngreso } = req.body;

        const internacionActualizada = actualizarInternacion(pacienteId, { fechaIngreso, motivoIngreso });
        if (!internacionActualizada) return res.status(404).send('Internación no encontrada');

        res.redirect(`/internacion/${internacionActualizada.id}`);
    }
   
    

}
module.exports = InternacionController;
// Exportar el controlador para usarlo en las rutas