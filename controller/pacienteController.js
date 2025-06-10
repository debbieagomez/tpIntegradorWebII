const { Paciente } = require('../models');

const pacienteController = {
  listarPacientes: async function (req, res) {
    try {
      const pacientes = await Paciente.findAll();
      res.render('paciente/listar', { pacientes });
    } catch (error) {
      console.error('Error al listar pacientes:', error);
      res.status(500).send('Error al obtener los pacientes');
    }
  },

  nuevoPaciente: async function (req, res) {
    try {
      res.render('paciente/formulario', { paciente: null });
    } catch (error) {
      console.error('Error al mostrar formulario:', error);
      res.status(500).send('Error al mostrar el formulario');
    }
  },

  crearPaciente: async function (req, res) {
    try {
      const { nombre, dni, sexo } = req.body;
      await Paciente.create({ nombre, dni, sexo });
      res.redirect('/paciente');
    } catch (error) {
      console.error('Error al crear paciente:', error);
      res.status(500).send('Error al crear el paciente');
    }
  },

  verPaciente: async function (req, res) {
    try {
      const paciente = await Paciente.findByPk(req.params.id);
      if (!paciente) return res.status(404).send('Paciente no encontrado');
      res.render('paciente/detalle', { paciente });
    } catch (error) {
      console.error('Error al ver paciente:', error);
      res.status(500).send('Error al mostrar el paciente');
    }
  }
};

module.exports = pacienteController;


