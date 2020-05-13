'use strict';
module.exports = (sequelize, DataTypes) => {
  const Estudiante = sequelize.define('Estudiante', {
    matricula: {
      type:DataTypes.INTEGER,
      allowNull:false,
      unique:true
    },
    apellidoPaterno:{
      type: DataTypes.STRING,
      allowNull:false
    },
    apellidoMaterno:{
      type: DataTypes.STRING,
      allowNull:false
    },
    nombre:{
      type: DataTypes.STRING,
      allowNull:false
    },
    semestreIngreso: {
      type:DataTypes.INTEGER,
      allowNull:true,
    },
    creditosCursados: {
      type:DataTypes.INTEGER,
      allowNull:true,
      defaultValue:0
    }
  }, {});
  Estudiante.associate = function(models) {
    Estudiante.belongsToMany(models.Cursos,{
      through: models.Inscripciones,
      foreignKey: 'estudianteid',
      timestamps: false
    });
  };
  return Estudiante;
};
