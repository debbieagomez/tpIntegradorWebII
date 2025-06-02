const pacientes = []; // almacenamiento en memoria temporal


exports.nuevoPaciente = (req, res) => {
  res.render('pacientes/formulario', { paciente: null });
};
exports.crearPaciente = (req, res) => {
  const { nombre, dni, sexo } = req.body;
  const nuevoPaciente = {
    id: pacientes.length + 1,
    nombre,
    dni,
    sexo
  };
  pacientes.push(nuevoPaciente);
  res.redirect('/pacientes');
};
exports.verPaciente = (req, res) => {
  const id = parseInt(req.params.id);
  const paciente = pacientes.find(p => p.id === id);
  if (!paciente) return res.status(404).send('Paciente no encontrado');
  res.render('pacientes/detalle', { paciente });
};
exports.editarPaciente = (req, res) => {
  const id = parseInt(req.params.id);
  const paciente = pacientes.find(p => p.id === id);
  if (!paciente) return res.status(404).send('Paciente no encontrado');
  res.render('pacientes/formulario', { paciente });
};
exports.actualizarPaciente = (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, dni, sexo } = req.body;
  const pacienteIndex = pacientes.findIndex(p => p.id === id);
  if (pacienteIndex === -1) return res.status(404).send('Paciente no encontrado');
  
  pacientes[pacienteIndex] = { id, nombre, dni, sexo };
  res.redirect('/pacientes');
};
exports.eliminarPaciente = (req, res) => {
  const id = parseInt(req.params.id);
  const pacienteIndex = pacientes.findIndex(p => p.id === id);
  if (pacienteIndex === -1) return res.status(404).send('Paciente no encontrado');
  
  pacientes.splice(pacienteIndex, 1);
  res.redirect('/pacientes');
};

exports.listarPacientes = (req, res) => {
  res.render('pacientes/listar', { pacientes });
};

