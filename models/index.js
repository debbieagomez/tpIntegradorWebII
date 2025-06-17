const sequelize = require('../configuracion/database');
const { DataTypes } = require('sequelize');

// Importar modelos
const Paciente = require('./paciente')(sequelize, DataTypes);
const Admision = require('./admision')(sequelize, DataTypes);
const Habitacion = require('./habitacion')(sequelize, DataTypes);
const Cama = require('./cama')(sequelize, DataTypes);
const Internacion = require('./internacion')(sequelize, DataTypes);

// Asociaciones

// Un paciente puede tener muchas admisiones
Paciente.hasMany(Admision, { foreignKey: 'pacienteId' });
Admision.belongsTo(Paciente, { foreignKey: 'pacienteId' });

// Una habitación puede tener muchas camas
Habitacion.hasMany(Cama, { foreignKey: 'habitacionId' });
Cama.belongsTo(Habitacion, { foreignKey: 'habitacionId' });

// Una cama puede tener muchas admisiones (en el tiempo)
Cama.hasMany(Admision, { foreignKey: 'camaId' });
Admision.belongsTo(Cama, { foreignKey: 'camaId' });

// Una admisión puede generar una internación
Admision.hasOne(Internacion, { foreignKey: 'admisionId' });
Internacion.belongsTo(Admision, { foreignKey: 'admisionId' });

// Exportar todo
module.exports = {
  sequelize,
  Paciente,
  Admision,
  Habitacion,
  Cama,
  Internacion
};


