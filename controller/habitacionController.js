
const { Habitacion } = require('../models');

const habitacionController = {
  listarHabitaciones: async function (req, res) {
    try {
      const habitaciones = await Habitacion.findAll();
      res.render('habitacion/listar', { habitaciones });
    } catch (error) {
      console.error('Error al listar habitaciones:', error);
      res.status(500).send('Error al listar habitaciones');
    }
  },

  nuevaHabitacion: async function (req, res) {
    try {
      res.render('habitacion/formulario');
    } catch (error) {
      console.error('Error al mostrar formulario:', error);
      res.status(500).send('Error al mostrar formulario');
    }
  },

  crearHabitacion: async function (req, res) {
    try {
      const { numero, tipo } = req.body;
      await Habitacion.create({ numero, tipo });
      res.redirect('/habitacion');
    } catch (error) {
      console.error('Error al crear habitación:', error);
      res.status(500).send('Error al crear habitación');
    }
  },

  verHabitacion: async function (req, res) {
    try {
      const habitacion = await Habitacion.findByPk(req.params.id);
      if (!habitacion) return res.status(404).send('Habitación no encontrada');
      res.render('habitacion/ver', { habitacion });
    } catch (error) {
      console.error('Error al ver habitación:', error);
      res.status(500).send('Error al cargar habitación');
    }
  },

  actualizarHabitacion: async function (req, res) {
    try {
      const habitacion = await Habitacion.findByPk(req.params.id);
      if (!habitacion) return res.status(404).send('Habitación no encontrada');

      const { numero, ala } = req.body;
      await habitacion.update({ numero, ala });
      res.redirect(`/habitacion/${habitacion.id}`);
    } catch (error) {
      console.error('Error al actualizar habitación:', error);
      res.status(500).send('Error al actualizar habitación');
    }
  },

  eliminarHabitacion: async function (req, res) {
    try {
      const habitacion = await Habitacion.findByPk(req.params.id);
      if (!habitacion) return res.status(404).send('Habitación no encontrada');

      await habitacion.destroy();
      res.redirect('/habitacion');
    } catch (error) {
      console.error('Error al eliminar habitación:', error);
      res.status(500).send('Error al eliminar habitación');
    }
  }
};

module.exports = habitacionController;