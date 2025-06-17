const { Paciente } = require('../models');


async function listarPacientes(req, res) {
  try {
    const pacientes = await Paciente.findAll();
    res.render('paciente/listar', { pacientes });
  } catch (error) {
    console.error('Error al listar pacientes:', error);
    res.status(500).send('Error al obtener los pacientes');
  }
}

async function nuevoPaciente(req, res) {
  try {
    res.render('paciente/formulario', { paciente: null });
  } catch (error) {
    console.error('Error al mostrar formulario:', error);
    res.status(500).send('Error al mostrar el formulario');
  }
}

async function crearPaciente(req, res) {
  try {
    console.log('Datos recibidos:', req.body);
    const { nombre, dni, sexo, seguro } = req.body;
    await Paciente.create({ nombre, dni, sexo, seguro });
    res.redirect('/paciente');
  } catch (error) {
    console.error('Error al crear paciente:', error);
    res.status(500).send('Error al crear el paciente');
  }
}

async function verPaciente(req, res) {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) return res.status(404).send('Paciente no encontrado');

    const mensaje = req.query.editado || null;

    res.render('paciente/detalle', { paciente, mensaje });
  } catch (error) {
    console.error('Error al ver paciente:', error);
    res.status(500).send('Error al mostrar el paciente');
  }
}

async function editarPaciente(req, res) {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) return res.status(404).send('Paciente no encontrado');
    res.render('paciente/formulario', { paciente });
  } catch (error) {
    console.error('Error al editar paciente:', error);
    res.status(500).send('Error al editar el paciente');
  }
}

async function actualizarPaciente(req, res) {
  try {
    const { nombre, dni, sexo, seguro } = req.body;
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) return res.status(404).send('Paciente no encontrado');

    await paciente.update({ nombre, dni, sexo, seguro });

    res.redirect(`/paciente/${paciente.id}?mensaje=paciente editado correctamente`);
  } catch (error) {
    console.error('Error al actualizar paciente:', error);
    res.status(500).send('Error al actualizar el paciente');
  }
}

async function listarPacientesConSeguro(req, res) {
  try{
    const paciente = await Paciente.findAll({
      where: {
        seguro: {
          [require('sequelize').Op.eq]: null
        }
      }
    });
    res.render('paciente/listar', { pacientes });
  } catch (error) {
    console.error('Error al listar pacientes con seguro:', error);
    res.status(500).send('Error al obtener los pacientes con seguro');
  }
}

async function listarPacientesSinSeguro(req, res) {
  try {
    const pacientes = await Paciente.findAll({
      where: {
        seguro: {
          [require('sequelize').Op.ne]: null
        }
      }
    });
    res.render('paciente/listar', { pacientes });
  } catch (error) {
    console.error('Error al listar pacientes sin seguro:', error);
    res.status(500).send('Error al obtener los pacientes sin seguro');
  }
}

async function eliminarPaciente(req, res) {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) return res.status(404).send('Paciente no encontrado');

    await paciente.destroy();
    res.redirect('/paciente');
  } catch (error) {
    console.error('Error al eliminar paciente:', error);
    res.status(500).send('Error al eliminar el paciente');
  }
}

module.exports = {
  listarPacientes,
  nuevoPaciente,
  crearPaciente,
  verPaciente,
  editarPaciente,
  actualizarPaciente,
  eliminarPaciente,
  listarPacientesConSeguro,
  listarPacientesSinSeguro
};


