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
    return queryInterface.bulkInsert('auth_roles', [
      {
        id: 1,
        group: 1,
        permission: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        group: 2,
        permission: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        group: 3,
        permission: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        group: 4,
        permission: 10,
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
    return queryInterface.bulkDelete('auth_roles', null, {});
  }
};
