module.exports = (sequelize, DataTypes) => {
  const Paciente = sequelize.define('Paciente', {
    nombre: DataTypes.STRING,
    dni: DataTypes.STRING,
    sexo: DataTypes.STRING
  });

  return Paciente;
};
