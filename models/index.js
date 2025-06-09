const sequelize = require('../configuracion/database');
const { DataTypes } = require('sequelize');

const Paciente = require('./paciente')(sequelize, DataTypes);
const Admision = require('./admision')(sequelize, DataTypes);
const Habitacion = require('./habitacion')(sequelize, DataTypes);
const Cama = require('./cama')(sequelize, DataTypes);
const Internacion = require('./internacion')(sequelize, DataTypes);

// Relaciones
Paciente.hasMany(Admision);
Admision.belongsTo(Paciente);

Habitacion.hasMany(Cama);
Cama.belongsTo(Habitacion);

Admision.belongsTo(Habitacion);
Admision.belongsTo(Cama);

Admision.hasOne(Internacion);
Internacion.belongsTo(Admision);

module.exports = {
  sequelize,
  Paciente,
  Admision,
  Habitacion,
  Cama,
  Internacion
};
