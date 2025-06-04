let internacion = []


function listarInternaciones() {
    return internacion;
}
function agregarInternacion(internacionData) {
    internacionData.id = internacion.length + 1;
    internacion.push(internacionData);
    return internacionData;
}
function actualizarInternacion(id, datosActualizados) {
    const index = internacion.findIndex(i => i.id === id);
    if (index !== -1) {
        internacion[index] = { ...internacion[index], ...datosActualizados };
        return internacion[index];
    }
    return null;
}
function obtenerInternacionesPorPaciente(pacienteId) {
    return internacion.filter(i => i.pacienteId === pacienteId);
}
function obtenerInternaciones() {
    return internacion;
}
function obtenerInternacionPorId(id) {
    return internacion.find(i => i.id === id);
}
function obtenerInternacionesDisponibles() {
    return internacion.filter(i => i.disponible);
}
function eliminarInternacionesPorPaciente(pacienteId) {
    const internacionesEliminadas = internacion.filter(i => i.pacienteId === pacienteId);
    internacion = internacion.filter(i => i.pacienteId !== pacienteId);
    return internacionesEliminadas;
}
function eliminarInternacionPorId(id) {
    const index = internacion.findIndex(i => i.id === id);
    if (index !== -1) {
        return internacion.splice(index, 1)[0];
    }
    return null;
}
module.exports = {
    internacion,
    listarInternaciones,
    obtenerInternacionPorId,
    agregarInternacion,
    actualizarInternacion,
    obtenerInternacionesPorPaciente,
    eliminarInternacionesPorPaciente,
    obtenerInternaciones,
    obtenerInternacionesDisponibles,
    eliminarInternacionPorId
};