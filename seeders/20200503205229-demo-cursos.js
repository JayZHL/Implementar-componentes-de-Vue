'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cursos', [
        {
        clave: 100,
        nombre: 'Programacion Perl',
        creditos: 6,
        createdAt:new Date(),
        updatedAt:new Date()
        },
        {
          clave: 99,
          nombre: 'POO',
          creditos: 6,
          createdAt:new Date(),
          updatedAt:new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cursos', {}, {});
  }
};
