module.exports = (sequelize, DataTypes) => {
  const Habitacion = sequelize.define('Habitacion', {
    numero: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING
    }
  });

  Habitacion.associate = (models) => {
    Habitacion.hasMany(models.Cama, { foreignKey: 'habitacionId' }); // ✅
  };

  return Habitacion;
};
