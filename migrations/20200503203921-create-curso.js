'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cursos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clave: {
        type: Sequelize.INTEGER,
        allowNull: false,
          unique:true
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      creditos: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue:0
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
    return queryInterface.dropTable('Cursos');
  }
};
