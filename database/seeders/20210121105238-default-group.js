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
    return queryInterface.bulkInsert('auth_groups', [
      {
        id: 1,
        name: 'administrator',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'admin',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'user',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'dashboard',
        description: '',
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
    return queryInterface.bulkDelete('auth_groups', null, {});
  }
};
