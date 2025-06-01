let admisiones = [];


// Función para agregar una nueva admisión
function agregarAdmision(admision) {
    admision.id = admisiones.length + 1;
    admisiones.push(admision);
    return admision;
}
// Función para actualizar una admisión por ID
function actualizarAdmision(id, datosActualizados) {
    const index = admisiones.findIndex(admision => admision.id === id);
    if (index !== -1) {
        admisiones[index] = { ...admisiones[index], ...datosActualizados };
        return admisiones[index];
    }
    return null;
}

// Función para obtener todas las admisiones
function obtenerAdmisiones() {
    return admisiones;
}
//funcion para obtener una admisión por pacienteID
function obtenerAdmisionPorPaciente(pacienteId) {
    return admisiones.filter(admision => admision.pacienteId === pacienteId);
}
// Función para eliminar una admisión por ID
function eliminarAdmisionPorPaciente(pacienteId) {
    for (let i = admisiones.length - 1; i >= 0; i--) {
        if (admisiones[i].pacienteId === pacienteId) {
            admisiones.splice(i, 1);
        }
    }
}


module.exports = {
    admisiones,
    agregarAdmision,
    actualizarAdmision,
    obtenerAdmisiones,
    obtenerAdmisionPorPaciente,
    eliminarAdmisionPorPaciente,
    
};