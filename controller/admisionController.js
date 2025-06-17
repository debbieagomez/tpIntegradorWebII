const { Admision, Paciente, Cama, Habitacion } = require ('../models');
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
      console.log('entrando a nuevaAdmision');
      const pacientes = await Paciente.findAll();
      console.log('pacientes', pacientes);
      const camas = await Cama.findAll({
        where: { disponible: true },
        include: [Habitacion]
      });
      console.log('camas', camas);
      res.render('admision/formularioAd', { pacientes, camas });
    } catch (error) {
       console.error('Error al mostrar formulario de admisión:', error);
      //res.status(500).send('Error al cargar el formulario');
    }
  },

  crearAdmision: async function (req, res) {
    try {
      const { pacienteId, camaId, motivoIngreso, fechaIngreso, seguro } = req.body;

      const paciente = await Paciente.findByPk(pacienteId);
      const cama = await Cama.findByPk(camaId, {
        include: Habitacion
      });

      if (!paciente || !cama || !cama.disponible) {
        return res.status(400).send('Paciente o cama inválida o no disponible');
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
          where: { fechaEgreso: null },
          include: [Paciente]
        }
      });

      const conflictoSexo = camasOcupadas.some(camaOcupada => {
        return camaOcupada.Admisions.some(adm => adm.Paciente.sexo !== paciente.sexo);
      });

      if (conflictoSexo) {
        return res.status(400).send('Conflicto de sexo en habitación compartida.');
      }

      
      await Admision.create({
        pacienteId,
        camaId,
        motivoIngreso,
        fechaIngreso,
        seguro: seguro === 'on' || seguro === true,
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
  },

  actualizarAdmision: async function (req, res) {
    try {
      const { motivoIngreso, fechaIngreso } = req.body;
      const admision = await Admision.findByPk(req.params.id);
      if (!admision) return res.status(404).send('Admisión no encontrada');

      await admision.update({ motivoIngreso, fechaIngreso });
      res.redirect(`/admision/${admision.id}`);
    } catch (error) {
      console.error('Error al actualizar admisión:', error);
      res.status(500).send('Error al actualizar la admisión');
    }
  },
  eliminarAdmision: async function (req, res) {
    try {
      const admision = await Admision.findByPk(req.params.id);
      if (!admision) return res.status(404).send('Admisión no encontrada');

      await admision.update({ estado: 'finalizada', fechaEgreso: new Date() });
      const cama = await Cama.findByPk(admision.camaId);
      await cama.update({ disponible: true });

      res.redirect('/admision');
    } catch (error) {
      console.error('Error al eliminar admisión:', error);
      res.status(500).send('Error al eliminar la admisión');
    }
  }

};

module.exports = admisionController;
