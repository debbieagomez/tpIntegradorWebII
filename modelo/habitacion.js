let habitaciones = [];

function listarHabitaciones() {
    return habitaciones;
}
// Función para agregar una nueva habitación
function agregarHabitacion(habitacion) {
    habitacion.id = habitaciones.length + 1;
    habitaciones.push(habitacion);
    return habitacion;
}
// Función para actualizar una habitación por ID
function actualizarHabitacion(id, datosActualizados) {
    const index = habitaciones.findIndex(habitacion => habitacion.id === id);
    if (index !== -1) {
        habitaciones[index] = { ...habitaciones[index], ...datosActualizados };
        return habitaciones[index];
    }
    return null;
}
// Función para obtener todas las habitaciones
function obtenerHabitaciones() {
    return habitaciones;
}
// Función para obtener una habitación por ID
function obtenerHabitacionPorId(id) {
    return habitaciones.find(habitacion => habitacion.id === id);
}
// Función para obtener habitaciones disponibles
function obtenerHabitacionesDisponibles() {
    return habitaciones.filter(habitacion => habitacion.disponible);
}
// Función para eliminar una habitación por ID
function eliminarHabitacionPorId(id) {
    const index = habitaciones.findIndex(habitacion => habitacion.id === id);
    if (index !== -1) {
        return habitaciones.splice(index, 1)[0];
    }
    return null;
}
module.exports = {
    habitaciones,
    listarHabitaciones,
    agregarHabitacion,
    actualizarHabitacion,
    obtenerHabitaciones,
    obtenerHabitacionPorId,
    obtenerHabitacionesDisponibles,
    eliminarHabitacionPorId
};