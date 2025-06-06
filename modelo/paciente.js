let pacientes = [];

function obtenerPacientes() {
  return pacientes;
}

function agregarPaciente(paciente) {
  paciente.id = pacientes.length + 1;
  pacientes.push(paciente);
  return paciente;
}

function buscarPacientePorId(id) {
  return pacientes.find(p => p.id === id);
}

function actualizarPaciente(id, nuevosDatos) {
  const index = pacientes.findIndex(p => p.id === id);
  if (index === -1) return null;
  pacientes[index] = { ...pacientes[index], ...nuevosDatos };
  return pacientes[index];
}

function eliminarPaciente(id) {
  const index = pacientes.findIndex(p => p.id === id);
  if (index === -1) return null;
  return pacientes.splice(index, 1)[0];
}

function buscarPorNombre(query) {
  return pacientes.filter(p => p.nombre.toLowerCase().includes(query.toLowerCase()));
}

module.exports = {
  pacientes,
  obtenerPacientes,
  agregarPaciente,
  buscarPacientePorId,
  actualizarPaciente,
  eliminarPaciente,
  buscarPorNombre
};

