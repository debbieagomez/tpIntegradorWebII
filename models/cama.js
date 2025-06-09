module.exports = (sequelize, DataTypes) => {
  const Cama = sequelize.define('Cama', {
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  return Cama;
};
