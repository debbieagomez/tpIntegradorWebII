const express = require('express');
const router = express.Router();

// Ruta para la página principal
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Sistema HIS',
    message: 'Bienvenido al sistema de gestión hospitalaria'
  });
});

module.exports = router;

