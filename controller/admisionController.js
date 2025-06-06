const {
    agregarAdmision,
     actualizarAdmision,
    obtenerAdmisiones,
    obtenerAdmisionPorPaciente,
    eliminarAdmisionPorPaciente
} = require('../modelo/admision');
const { pacientes } = require('../modelo/paciente');

class AdmisionController {
    // Listar todas las admisiones
    static listarAdmisiones(req, res) {
        const admisiones = obtenerAdmisiones();
        res.render('admision/listar', { admisiones });
    }
    static nuevaAdmision(req, res) {
        console.log('cargando vista formularioAd');
        // Renderizar el formulario para crear una nueva admisión
        res.render('admision/formularioAd', { pacientes });
    }

    // Ver todas las admisiones de un paciente
    static verAdmision(req, res) {
        const pacienteId = parseInt(req.params.id);
        const admisionesPaciente = obtenerAdmisionPorPaciente(pacienteId);
        const paciente = pacientes.find(p => p.id === pacienteId);

        if (!paciente) return res.status(404).send('Paciente no encontrado');

        res.render('admision/ver', {
            paciente,
            admisiones: admisionesPaciente
        });
    }

    // Crear una nueva admisión
    static crearAdmision(req, res) {
        const { pacienteId, fechaIngreso, motivoIngreso } = req.body;
        const paciente = pacientes.find(p => p.id === parseInt(pacienteId));
        if (!paciente) return res.status(404).send('Paciente no encontrado');

        const nuevaAdmision = agregarAdmision({ pacienteId: paciente.id, fechaIngreso, motivoIngreso });
        res.redirect(`/admision/${paciente.id}`);
    }

    // Actualizar una admisión específica
    static actualizarAdmision(req, res) {
        const admisionId = parseInt(req.params.id);
        const { fechaIngreso, motivoIngreso } = req.body;

        const admisionActualizada = actualizarAdmision(admisionId, { fechaIngreso, motivoIngreso });
        if (!admisionActualizada) return res.status(404).send('Admisión no encontrada');

        res.redirect(`/admision/${admisionActualizada.pacienteId}`);
    }

    // Eliminar todas las admisiones de un paciente
    static eliminarAdmision(req, res) {
        const pacienteId = parseInt(req.params.id);
        eliminarAdmisionPorPaciente(pacienteId);
        res.redirect('/admision');
    }
}

module.exports = AdmisionController;
// Este controlador maneja las operaciones CRUD para las admisiones de pacientes en un sistema hospitalario.
// Permite listar, ver, crear, actualizar y eliminar admisiones asociadas a pacientes.
