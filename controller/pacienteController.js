const {
  obtenerPacientes,
  agregarPaciente,
  buscarPacientePorId,
  actualizarPaciente,
  eliminarPaciente,
  buscarPorNombre
} = require('../modelo/paciente');

const pacienteController = {
  listarPacientes(req, res) {
    const pacientes = obtenerPacientes();
    res.render('paciente/listar', { pacientes });
  },

  nuevoPaciente(req, res) {
    res.render('paciente/formulario', { paciente: null });
  },

  crearPaciente(req, res) {
    const { nombre, dni, sexo } = req.body;
    agregarPaciente({ nombre, dni, sexo });
    res.redirect('/pacientes');
  },

  verPaciente(req, res) {
    const paciente = buscarPacientePorId(parseInt(req.params.id));
    if (!paciente) return res.status(404).send('Paciente no encontrado');
    res.render('paciente/detalle', { paciente });
  },

  editarPaciente(req, res) {
    const paciente = buscarPacientePorId(parseInt(req.params.id));
    if (!paciente) return res.status(404).send('Paciente no encontrado');
    res.render('paciente/formulario', { paciente });
  },

  actualizarPaciente(req, res) {
    const id = parseInt(req.params.id);
    const { nombre, dni, sexo } = req.body;
    const actualizado = actualizarPaciente(id, { nombre, dni, sexo });
    if (!actualizado) return res.status(404).send('Paciente no encontrado');
    res.redirect('/pacientes');
  },

  eliminarPaciente(req, res) {
    const eliminado = eliminarPaciente(parseInt(req.params.id));
    if (!eliminado) return res.status(404).send('Paciente no encontrado');
    res.redirect('/pacientes');
  },

  buscarPacientes(req, res) {
    const { query } = req.query;
    const resultados = buscarPorNombre(query);
    res.render('paciente/buscar', { resultados, query });
  },

  
  verHistorialPaciente(req, res) {
    const paciente = buscarPacientePorId(parseInt(req.params.id));
    if (!paciente) return res.status(404).send('Paciente no encontrado');
    res.render('paciente/historial', { paciente, historial: [] });
  },
  verInternacionesPaciente(req, res) {
    const paciente = buscarPacientePorId(parseInt(req.params.id));
    if (!paciente) return res.status(404).send('Paciente no encontrado');
    res.render('paciente/internaciones', { paciente, internaciones: [] });
  },
  verHabitacionesPaciente(req, res) {
    const paciente = buscarPacientePorId(parseInt(req.params.id));
    if (!paciente) return res.status(404).send('Paciente no encontrado');
    res.render('paciente/habitaciones', { paciente, habitaciones: [] });
  },
  verConsultasPaciente(req, res) {
    const paciente = buscarPacientePorId(parseInt(req.params.id));
    if (!paciente) return res.status(404).send('Paciente no encontrado');
    res.render('paciente/consultas', { paciente, consultas: [] });
  },
  verTratamientosPaciente(req, res) {
    const paciente = buscarPacientePorId(parseInt(req.params.id));
    if (!paciente) return res.status(404).send('Paciente no encontrado');
    res.render('paciente/tratamientos', { paciente, tratamientos: [] });
  },
  verMedicamentosPaciente(req, res) {
    const paciente = buscarPacientePorId(parseInt(req.params.id));
    if (!paciente) return res.status(404).send('Paciente no encontrado');
    res.render('paciente/medicamentos', { paciente, medicamentos: [] });
  },
  verResultadosPaciente(req, res) {
    const paciente = buscarPacientePorId(parseInt(req.params.id));
    if (!paciente) return res.status(404).send('Paciente no encontrado');
    res.render('paciente/resultados', { paciente, resultados: [] });
  },
  verCitasPaciente(req, res) {
    const paciente = buscarPacientePorId(parseInt(req.params.id));
    if (!paciente) return res.status(404).send('Paciente no encontrado');
    res.render('paciente/citas', { paciente, citas: [] });
  },
  verFacturasPaciente(req, res) {
    const paciente = buscarPacientePorId(parseInt(req.params.id));
    if (!paciente) return res.status(404).send('Paciente no encontrado');
    res.render('paciente/facturas', { paciente, facturas: [] });
  },
  verDocumentosPaciente(req, res) {
    const paciente = buscarPacientePorId(parseInt(req.params.id));
    if (!paciente) return res.status(404).send('Paciente no encontrado');
    res.render('paciente/documentos', { paciente, documentos: [] });
  }
};

module.exports = pacienteController;
