const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('his_sistema', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', 
  logging: false,
});

module.exports = sequelize;
