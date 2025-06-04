let camas = [];

function agregarCama(cama) {
    cama.id = camas.length + 1;
    camas.push(cama);
    return cama;
}

function actualizarCama(id, datosActualizados) {
    const index = camas.findIndex(cama => cama.id === id);
    if (index !== -1) {
        camas[index] = { ...camas[index], ...datosActualizados };
        return camas[index];
    }
    return null;
}

function obtenerCamas() {
    return camas;
}

function obtenerCamaPorId(id) {
    return camas.find(cama => cama.id === id);
}

function obtenerCamasDisponibles() {
    return camas.filter(cama => cama.disponible);
}

function eliminarCamaPorId(id) {
    const index = camas.findIndex(cama => cama.id === id);
    if (index !== -1) {
        return camas.splice(index, 1)[0];
    }
    return null;
}

module.exports = {
    camas,
    agregarCama,
    actualizarCama,
    obtenerCamas,
    obtenerCamaPorId,
    obtenerCamasDisponibles,
    eliminarCamaPorId
};


