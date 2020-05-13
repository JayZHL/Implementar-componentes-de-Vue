'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Estudiantes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      matricula: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique:true
      },
      apellidoPaterno: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apellidoMaterno: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      semestreIngreso: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      creditosCursados: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Estudiantes');
  }
};
