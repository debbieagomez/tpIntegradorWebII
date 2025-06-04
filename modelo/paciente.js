const pacientes = [];

// Funciones

function listarPacientes(req, res) {
  res.render('pacientes/listar', { pacientes });
}

function nuevoPaciente(req, res) {
  res.render('pacientes/formulario', { paciente: null });
}

function crearPaciente(req, res) {
  const { nombre, dni, sexo } = req.body;
  const nuevoPaciente = {
    id: pacientes.length + 1,
    nombre,
    dni,
    sexo
  };
  pacientes.push(nuevoPaciente);
  res.redirect('/pacientes');
}

function verPaciente(req, res) {
  const id = parseInt(req.params.id);
  const paciente = pacientes.find(p => p.id === id);
  if (!paciente) return res.status(404).send('Paciente no encontrado');
  res.render('pacientes/detalle', { paciente });
}

function editarPaciente(req, res) {
  const id = parseInt(req.params.id);
  const paciente = pacientes.find(p => p.id === id);
  if (!paciente) return res.status(404).send('Paciente no encontrado');
  res.render('pacientes/formulario', { paciente });
}

function actualizarPaciente(req, res) {
  const id = parseInt(req.params.id);
  const { nombre, dni, sexo } = req.body;
  const pacienteIndex = pacientes.findIndex(p => p.id === id);
  if (pacienteIndex === -1) return res.status(404).send('Paciente no encontrado');
  pacientes[pacienteIndex] = { id, nombre, dni, sexo };
  res.redirect('/pacientes');
}

function eliminarPaciente(req, res) {
  const id = parseInt(req.params.id);
  const index = pacientes.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).send('Paciente no encontrado');
  pacientes.splice(index, 1);
  res.redirect('/pacientes');
}

function buscarPacientes(req, res) {
  const { query } = req.query;
  const resultados = pacientes.filter(p => p.nombre.toLowerCase().includes(query.toLowerCase()));
  res.render('pacientes/buscar', { resultados, query });
}

function verHistorialPaciente(req, res) {
  const paciente = buscarPorId(req, res);
  if (!paciente) return;
  res.render('pacientes/historial', { paciente, historial: [] });
}

function verHabitacionesPaciente(req, res) {
  const paciente = buscarPorId(req, res);
  if (!paciente) return;
  res.render('pacientes/habitaciones', { paciente, habitaciones: [] });
}

function verAdmisionesPaciente(req, res) {
  const paciente = buscarPorId(req, res);
  if (!paciente) return;
  res.render('pacientes/admisiones', { paciente, admisiones: [] });
}

function verInternacionesPaciente(req, res) {
  const paciente = buscarPorId(req, res);
  if (!paciente) return;
  res.render('pacientes/internaciones', { paciente, internaciones: [] });
}

function verConsultasPaciente(req, res) {
  const paciente = buscarPorId(req, res);
  if (!paciente) return;
  res.render('pacientes/consultas', { paciente, consultas: [] });
}

function verTratamientosPaciente(req, res) {
  const paciente = buscarPorId(req, res);
  if (!paciente) return;
  res.render('pacientes/tratamientos', { paciente, tratamientos: [] });
}

function verMedicamentosPaciente(req, res) {
  const paciente = buscarPorId(req, res);
  if (!paciente) return;
  res.render('pacientes/medicamentos', { paciente, medicamentos: [] });
}

function verResultadosPaciente(req, res) {
  const paciente = buscarPorId(req, res);
  if (!paciente) return;
  res.render('pacientes/resultados', { paciente, resultados: [] });
}

function verCitasPaciente(req, res) {
  const paciente = buscarPorId(req, res);
  if (!paciente) return;
  res.render('pacientes/citas', { paciente, citas: [] });
}

function verFacturasPaciente(req, res) {
  const paciente = buscarPorId(req, res);
  if (!paciente) return;
  res.render('pacientes/facturas', { paciente, facturas: [] });
}

function verDocumentosPaciente(req, res) {
  const paciente = buscarPorId(req, res);
  if (!paciente) return;
  res.render('pacientes/documentos', { paciente, documentos: [] });
}

// Utilidad interna para evitar repetir código
function buscarPorId(req, res) {
  const id = parseInt(req.params.id);
  const paciente = pacientes.find(p => p.id === id);
  if (!paciente) {
    res.status(404).send('Paciente no encontrado');
    return null;
  }
  return paciente;
}

// Exportar
module.exports = {
  listarPacientes,
  nuevoPaciente,
  crearPaciente,
  verPaciente,
  editarPaciente,
  actualizarPaciente,
  eliminarPaciente,
  buscarPacientes,
  verHistorialPaciente,
  verHabitacionesPaciente,
  verAdmisionesPaciente,
  verInternacionesPaciente,
  verConsultasPaciente,
  verTratamientosPaciente,
  verMedicamentosPaciente,
  verResultadosPaciente,
  verCitasPaciente,
  verFacturasPaciente,
  verDocumentosPaciente
};

