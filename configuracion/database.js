const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nombre_base', 'usuario', 'contraseña', {
  host: 'localhost',
  dialect: 'mysql', 
  logging: false,
});

module.exports = sequelize;
