'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('auth_permissions', [
      {
        id: 1,
        application: 1,
        modul: 1,
        metode: 'get',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        application: 1,
        modul: 2,
        metode: 'get',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        application: 1,
        modul: 2,
        metode: 'post',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        application: 1,
        modul: 3,
        metode: 'get',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        application: 1,
        modul: 3,
        metode: 'post',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        application: 1,
        modul: 4,
        metode: 'get',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        application: 2,
        modul: 1,
        metode: 'get',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        application: 3,
        modul: 1,
        metode: 'get',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        application: 4,
        modul: 1,
        metode: 'get',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        application: 5,
        modul: 1,
        metode: 'get',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        application: 2,
        modul: 5,
        metode: 'get',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        application: 3,
        modul: 5,
        metode: 'get',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        application: 4,
        modul: 5,
        metode: 'get',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('auth_permissions', null, {});
  }
};
