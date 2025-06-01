const pacientes = []; // almacenamiento en memoria temporal

exports.listarPacientes = (req, res) => {
  res.render('pacientes/listar', { pacientes });
};

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