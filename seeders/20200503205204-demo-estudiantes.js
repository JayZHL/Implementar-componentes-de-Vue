'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Estudiantes', [
      {
      matricula: 1151075,
      apellidoPaterno: 'Huerta',
      apellidoMaterno:'Llamas',
      nombre: 'Juan Carlos',
      semestreIngreso: '2017-1',
      creditosCursados: 134,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
        matricula: 11990,
        apellidoPaterno: 'Camaney',
        apellidoMaterno:'Sanchez',
        nombre: 'Juan',
        semestreIngreso: '2016-2',
        creditosCursados: 152,
        createdAt: new Date(),
        updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Estudiantes', {}, {});
  }
};
