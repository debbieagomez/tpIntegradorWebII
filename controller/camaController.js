const { Cama, Habitacion } = require('../models');

const camaController = {
  listarCamas: async function (req, res) {
    try {
      const camas = await Cama.findAll({ include: Habitacion });
      res.render('cama/listar', { camas });
    } catch (error) {
      console.error('Error al listar camas:', error);
      res.status(500).send('Error al listar camas');
    }
  },
  listarCamasDisponibles: async function (req, res) {
    try {
      const camas = await Cama.findAll({ where: { disponible: true }, include: Habitacion });
      res.render('cama/listar', { camas });
    } catch (error) {
      console.error('Error al listar camas disponibles:', error);
      res.status(500).send('Error al listar camas disponibles');
    }
  },

  nuevaCama: async function (req, res) {
    try {
      const habitaciones = await Habitacion.findAll();
      res.render('cama/formulario', { habitaciones });
    } catch (error) {
      console.error('Error al cargar formulario de cama:', error);
      res.status(500).send('Error al cargar formulario');
    }
  },

  crearCama: async function (req, res) {
    try {
      const { numero, tipo, disponible, habitacionId } = req.body;
      await Cama.create({
        numero,
        tipo,
        disponible: disponible === 'true',
        habitacionId
      });
      res.redirect('/cama');
    } catch (error) {
      console.error('Error al crear cama:', error);
      res.status(500).send('Error al crear cama');
    }
  },

  verCama: async function (req, res) {
    try {
      const cama = await Cama.findByPk(req.params.id, { include: Habitacion });
      if (!cama) return res.status(404).send('Cama no encontrada');
      res.render('cama/ver', { cama });
    } catch (error) {
      console.error('Error al ver cama:', error);
      res.status(500).send('Error al cargar cama');
    }
  },

  actualizarCama: async function (req, res) {
    try {
      const { numero, tipo, disponible, habitacionId } = req.body;
      const cama = await Cama.findByPk(req.params.id);
      if (!cama) return res.status(404).send('Cama no encontrada');

      await cama.update({
        numero,
        tipo,
        disponible: disponible === 'true',
        habitacionId
      });

      res.redirect(`/cama/${cama.id}`);
    } catch (error) {
      console.error('Error al actualizar cama:', error);
      res.status(500).send('Error al actualizar cama');
    }
  },

  eliminarCama: async function (req, res) {
    try {
      const cama = await Cama.findByPk(req.params.id);
      if (!cama) return res.status(404).send('Cama no encontrada');

      await cama.destroy();
      res.redirect('/cama');
    } catch (error) {
      console.error('Error al eliminar cama:', error);
      res.status(500).send('Error al eliminar cama');
    }
  }
};

module.exports = camaController;

