module.exports = (sequelize, DataTypes) => {
  const Internacion = sequelize.define('Internacion', {
    fechaInicio: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fechaFin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: 'activa'
    }
  });

  // Relaciones
  Internacion.associate = (models) => {
    Internacion.belongsTo(models.Admision, { foreignKey: 'admisionId' });
  };

  return Internacion;
};
