const {
  obtenerCamas,
  obtenerCamasDisponibles,
  obtenerCamaPorId,
  agregarCama,
  actualizarCama,
  eliminarCamaPorId,
} = require('../modelo/cama');

const camaController = {
  // Listar todas las camas
  listarCamas: (req, res) => {
    const camas = obtenerCamas();
    res.render('cama/listar', { camas });
  },

  // Listar camas disponibles
  listarCamasDisponibles: (req, res) => {
    const camasDisponibles = obtenerCamasDisponibles();
    res.render('cama/disponibles', { camas: camasDisponibles });
  },

  // Ver detalles de una cama específica
  verCama: (req, res) => {
    const camaId = parseInt(req.params.id);
    const cama = obtenerCamaPorId(camaId);
    if (!cama) return res.status(404).send('Cama no encontrada');
    res.render('cama/ver', { cama });
  },

  // Crear una nueva cama
  crearCama: (req, res) => {
    const { numero, tipo, disponible } = req.body;
    const nuevaCama = agregarCama({ numero, tipo, disponible: disponible === 'true' });
    res.redirect('/camas');
  },

  // Actualizar una cama específica
  actualizarCama: (req, res) => {
    const camaId = parseInt(req.params.id);
    const { numero, tipo, disponible } = req.body;
    const camaActualizada = actualizarCama(camaId, { numero, tipo, disponible: disponible === 'true' });
    if (!camaActualizada) return res.status(404).send('Cama no encontrada');
    res.redirect(`/camas/${camaId}`);
  },

  // Eliminar una cama específica
  eliminarCama: (req, res) => {
    const camaId = parseInt(req.params.id);
    eliminarCamaPorId(camaId);
    res.redirect('/camas');
  }
};

module.exports = camaController;


