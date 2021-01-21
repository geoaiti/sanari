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
    return queryInterface.bulkInsert('auth_applications', [
      {
        id: 1,
        name: 'Auth',
        prefix: 'auth',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Developer',
        prefix: 'administrator',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Administrator',
        prefix: 'admin',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Dashboard',
        prefix: 'dashboard',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'User',
        prefix: 'user',
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
    return queryInterface.bulkDelete('auth_applications', null, {});
  }
};
