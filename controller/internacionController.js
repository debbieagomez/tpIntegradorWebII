const { Internacion, Admision, Paciente, Cama } = require('../models');

const internacionController = {
  listarInternaciones: async function (req, res) {
    try {
      const internaciones = await Internacion.findAll({
        include: {
          model: Admision,
          include: [Paciente, Cama]
        }
      });
      res.render('internacion/listar', { internaciones });
    } catch (error) {
      console.error('Error al listar internaciones:', error);
      res.status(500).send('Error al listar internaciones');
    }
  },

  nuevaInternacion: async function (req, res) {
    try {
      const admisiones = await Admision.findAll({
        where: { estado: 'activa' },
        include: [Paciente, Cama]
      });

      res.render('internacion/formulario', { admisiones });
    } catch (error) {
      console.error('Error al mostrar formulario de internación:', error);
      res.status(500).send('Error al cargar formulario');
    }
  },

  crearInternacion: async function (req, res) {
    try {
      const { admisionId, diagnostico, tratamiento } = req.body;

      const admision = await Admision.findByPk(admisionId);
      if (!admision || admision.estado !== 'activa') {
        return res.status(400).send('Admisión no válida');
      }

      await Internacion.create({
        admisionId,
        diagnostico,
        tratamiento,
        fechaInicio: new Date(),
        estado: 'activa'
      });

      res.redirect('/internacion');
    } catch (error) {
      console.error('Error al crear internación:', error);
      res.status(500).send('Error al registrar internación');
    }
  },

  finalizarInternacion: async function (req, res) {
    try {
      const id = req.params.id;
      const internacion = await Internacion.findByPk(id, {
        include: { model: Admision, include: Cama }
      });

      if (!internacion || internacion.estado !== 'activa') {
        return res.status(404).send('Internación no activa encontrada');
      }

      // Marcar como finalizada
      await internacion.update({
        estado: 'finalizada',
        fechaFin: new Date()
      });

      // Finalizar admisión y liberar cama
      await internacion.Admision.update({
        estado: 'finalizada',
        fechaEgreso: new Date()
      });

      await internacion.Admision.Cama.update({ disponible: true });

      res.redirect('/internacion');
    } catch (error) {
      console.error('Error al finalizar internación:', error);
      res.status(500).send('Error al finalizar internación');
    }
  },

  verInternacion: async function (req, res) {
    try {
      const internacion = await Internacion.findByPk(req.params.id, {
        include: {
          model: Admision,
          include: [Paciente, Cama]
        }
      });

      if (!internacion) return res.status(404).send('Internación no encontrada');

      res.render('internacion/ver', { internacion });
    } catch (error) {
      console.error('Error al mostrar internación:', error);
      res.status(500).send('Error al mostrar detalles');
    }
  }
};

module.exports = internacionController;

