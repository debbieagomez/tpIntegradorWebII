module.exports = (sequelize, DataTypes) => {
  const Admision = sequelize.define('Admision', {
    motivoIngreso: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaIngreso: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fechaEgreso: {
      type: DataTypes.DATE,
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: 'activa'
    },
    seguro: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Admision.associate = (models) => {
    Admision.belongsTo(models.Paciente, { foreignKey: 'pacienteId' });
    Admision.belongsTo(models.Cama, { foreignKey: 'camaId' });
  };

  return Admision;
};
