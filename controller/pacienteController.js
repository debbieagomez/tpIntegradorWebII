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
exports.buscarPacientes = (req, res) => {
  const { query } = req.query;
  const resultados = pacientes.filter(p => p.nombre.toLowerCase().includes(query.toLowerCase()));
  res.render('pacientes/buscar', { resultados, query });
};
exports.verHistorialPaciente = (req, res) => {
  const id = parseInt(req.params.id);
  const paciente = pacientes.find(p => p.id === id);
  if (!paciente) return res.status(404).send('Paciente no encontrado');
  
  // Aquí se debería obtener el historial del paciente desde la base de datos o modelo correspondiente
  const historial = []; // Simulación de historial vacío
  
  res.render('pacientes/historial', { paciente, historial });
};
exports.verPacientesPorSexo = (req, res) => {
  const sexo = req.params.sexo;
  const pacientesPorSexo = pacientes.filter(p => p.sexo.toLowerCase() === sexo.toLowerCase());
  
  if (pacientesPorSexo.length === 0) return res.status(404).send('No se encontraron pacientes con ese sexo');
  
  res.render('pacientes/por_sexo', { pacientes: pacientesPorSexo, sexo });
};
exports.verPacientesPorEdad = (req, res) => {
  const edadMin = parseInt(req.params.edadMin);
  const edadMax = parseInt(req.params.edadMax);
  
  // Simulación de pacientes con edades
  const pacientesConEdades = pacientes.filter(p => {
    // Aquí se debería calcular la edad real del paciente
    const edadPaciente = Math.floor(Math.random() * (edadMax - edadMin + 1)) + edadMin; // Simulación de edad
    return edadPaciente >= edadMin && edadPaciente <= edadMax;
  });
  
  if (pacientesConEdades.length === 0) return res.status(404).send('No se encontraron pacientes en ese rango de edad');
  
  res.render('pacientes/por_edad', { pacientes: pacientesConEdades, edadMin, edadMax });
};
exports.verPacientesPorDNI = (req, res) => {
  const dni = req.params.dni;
  const pacientesPorDNI = pacientes.filter(p => p.dni === dni);
  
  if (pacientesPorDNI.length === 0) return res.status(404).send('No se encontraron pacientes con ese DNI');
  
  res.render('pacientes/por_dni', { pacientes: pacientesPorDNI, dni });
};
exports.verPacientesPorNombre = (req, res) => {
  const nombre = req.params.nombre;
  const pacientesPorNombre = pacientes.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase()));
  
  if (pacientesPorNombre.length === 0) return res.status(404).send('No se encontraron pacientes con ese nombre');
  
  res.render('pacientes/por_nombre', { pacientes: pacientesPorNombre, nombre });
};
exports.verPacientesPorFechaIngreso = (req, res) => {
  const fechaIngreso = req.params.fechaIngreso;
  const pacientesPorFecha = pacientes.filter(p => p.fechaIngreso === fechaIngreso);
  
  if (pacientesPorFecha.length === 0) return res.status(404).send('No se encontraron pacientes con esa fecha de ingreso');
  
  res.render('pacientes/por_fecha_ingreso', { pacientes: pacientesPorFecha, fechaIngreso });
};
exports.verPacientesPorMotivoIngreso = (req, res) => {
  const motivoIngreso = req.params.motivoIngreso;
  const pacientesPorMotivo = pacientes.filter(p => p.motivoIngreso.toLowerCase().includes(motivoIngreso.toLowerCase()));
  
  if (pacientesPorMotivo.length === 0) return res.status(404).send('No se encontraron pacientes con ese motivo de ingreso');
  
  res.render('pacientes/por_motivo_ingreso', { pacientes: pacientesPorMotivo, motivoIngreso });
};
exports.verPacientesPorEstado = (req, res) => {
  const estado = req.params.estado;
  const pacientesPorEstado = pacientes.filter(p => p.estado.toLowerCase() === estado.toLowerCase());
  
  if (pacientesPorEstado.length === 0) return res.status(404).send('No se encontraron pacientes con ese estado');
  
  res.render('pacientes/por_estado', { pacientes: pacientesPorEstado, estado });
};
exports.verPacientesPorHabitacion = (req, res) => {
  const habitacionId = parseInt(req.params.habitacionId);
  const pacientesPorHabitacion = pacientes.filter(p => p.habitacionId === habitacionId);
  
  if (pacientesPorHabitacion.length === 0) return res.status(404).send('No se encontraron pacientes en esa habitación');
  
  res.render('pacientes/por_habitacion', { pacientes: pacientesPorHabitacion, habitacionId });
};
exports.verPacientesPorInternacion = (req, res) => {
  const internacionId = parseInt(req.params.internacionId);
  const pacientesPorInternacion = pacientes.filter(p => p.internacionId === internacionId);
  
  if (pacientesPorInternacion.length === 0) return res.status(404).send('No se encontraron pacientes con esa internación');
  
  res.render('pacientes/por_internacion', { pacientes: pacientesPorInternacion, internacionId });
};
exports.verPacientesPorAdmision = (req, res) => {
  const admisionId = parseInt(req.params.admisionId);
  const pacientesPorAdmision = pacientes.filter(p => p.admisionId === admisionId);
  
  if (pacientesPorAdmision.length === 0) return res.status(404).send('No se encontraron pacientes con esa admisión');
  
  res.render('pacientes/por_admision', { pacientes: pacientesPorAdmision, admisionId });
};
exports.verPacientesPorTratamiento = (req, res) => {
  const tratamientoId = parseInt(req.params.tratamientoId);
  const pacientesPorTratamiento = pacientes.filter(p => p.tratamientoId === tratamientoId);
  
  if (pacientesPorTratamiento.length === 0) return res.status(404).send('No se encontraron pacientes con ese tratamiento');
  
  res.render('pacientes/por_tratamiento', { pacientes: pacientesPorTratamiento, tratamientoId });
};
exports.verPacientesPorCita = (req, res) => {
  const citaId = parseInt(req.params.citaId);
  const pacientesPorCita = pacientes.filter(p => p.citaId === citaId);
  
  if (pacientesPorCita.length === 0) return res.status(404).send('No se encontraron pacientes con esa cita');
  
  res.render('pacientes/por_cita', { pacientes: pacientesPorCita, citaId });
};
exports.verPacientesPorConsulta = (req, res) => {
  const consultaId = parseInt(req.params.consultaId);
  const pacientesPorConsulta = pacientes.filter(p => p.consultaId === consultaId);
  
  if (pacientesPorConsulta.length === 0) return res.status(404).send('No se encontraron pacientes con esa consulta');
  
  res.render('pacientes/por_consulta', { pacientes: pacientesPorConsulta, consultaId });
};




