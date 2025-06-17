module.exports = (sequelize, DataTypes) => {
  const Cama = sequelize.define('Cama', {
    numero: DataTypes.STRING,
    tipo: DataTypes.STRING,
    disponible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  Cama.associate = function (models) {
    Cama.belongsTo(models.Habitacion, { foreignKey: 'habitacionId' });
    Cama.hasMany(models.Admision); // Relación con Admision
  };

  return Cama;
};
