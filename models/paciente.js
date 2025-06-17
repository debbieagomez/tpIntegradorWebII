module.exports = (sequelize, DataTypes) => {
  const Paciente = sequelize.define('Paciente', {
    nombre: DataTypes.STRING,
    dni: DataTypes.STRING,
    sexo: DataTypes.STRING,
    tieneseguro: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }

  });
  Paciente.associate = function(models) {
    Paciente.hasMany(models.Admision, {
      foreignKey: 'pacienteId'
    });
  };

  return Paciente;
};
