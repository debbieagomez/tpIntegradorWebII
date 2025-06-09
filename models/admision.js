module.exports = (sequelize, DataTypes) => {
  const Admision = sequelize.define('Admision', {
    fechaIngreso: {
      type: DataTypes.DATE,
      allowNull: false
    },
    motivoIngreso: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
  });

  return Admision;
};
