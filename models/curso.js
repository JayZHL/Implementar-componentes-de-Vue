'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cursos = sequelize.define('Cursos', {
    clave: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    creditos: DataTypes.INTEGER
  }, {});
  Cursos.associate = function(models) {
    Cursos.belongsToMany(models.Estudiante,{
      through: models.Inscripciones,
      foreignKey: 'cursoid',
      timestamps: false
    });
  };
  return Cursos;
};
