const { Admision, Paciente, Cama, Habitacion } = require('../models');
const { Op } = require('sequelize');

const admisionController = {
  listarAdmisiones: async function (req, res) {
    try {
      const admisiones = await Admision.findAll({
        include: [Paciente, Cama]
      });
      res.render('admision/listar', { admisiones });
    } catch (error) {
      console.error('Error al listar admisiones:', error);
      res.status(500).send('Error al listar admisiones');
    }
  },

  nuevaAdmision: async function (req, res) {
    try {
      const pacientes = await Paciente.findAll();
      const camas = await Cama.findAll({ where: { disponible: true } });
      res.render('admision/formularioAd', { pacientes, camas });
    } catch (error) {
      console.error('Error al mostrar formulario de admisión:', error);
      res.status(500).send('Error al cargar el formulario');
    }
  },

  crearAdmision: async function (req, res) {
    try {
      const { pacienteId, camaId, motivoIngreso, fechaIngreso } = req.body;

      const paciente = await Paciente.findByPk(pacienteId);
      const cama = await Cama.findByPk(camaId, { include: Habitacion });

      if (!paciente || !cama || !cama.disponible) {
        return res.status(400).send('Paciente o cama inválida');
      }

      const habitacion = cama.Habitacion;
      const camasOcupadas = await Cama.findAll({
        where: {
          habitacionId: habitacion.id,
          disponible: false,
          id: { [Op.ne]: cama.id }
        },
        include: {
          model: Admision,
          where: { fechaEgreso: null }
        }
      });

      const conflictoSexo = await Promise.all(
        camasOcupadas.map(async camaOcupada => {
          const adm = await Admision.findOne({
            where: { camaId: camaOcupada.id, fechaEgreso: null },
            include: Paciente
          });
          return adm && adm.Paciente.sexo !== paciente.sexo;
        })
      );

      if (conflictoSexo.includes(true)) {
        return res.status(400).send('Conflicto de sexo en habitación compartida.');
      }

      await Admision.create({
        pacienteId,
        camaId,
        motivoIngreso,
        fechaIngreso,
        estado: 'activa'
      });

      await cama.update({ disponible: false });

      res.redirect('/admision');
    } catch (error) {
      console.error('Error al crear admisión:', error);
      res.status(500).send('Error al registrar admisión');
    }
  },

  verAdmision: async function (req, res) {
    try {
      const admision = await Admision.findByPk(req.params.id, {
        include: [Paciente, Cama]
      });
      if (!admision) return res.status(404).send('Admisión no encontrada');
      res.render('admision/ver', { admision });
    } catch (error) {
      console.error('Error al ver admisión:', error);
      res.status(500).send('Error al mostrar la admisión');
    }
  }
};

module.exports = admisionController;
