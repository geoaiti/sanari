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
    return queryInterface.bulkInsert('auth_user_roles', [
      {
        id: 1,
        user: 1,
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        user: 2,
        role: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        user: 3,
        role: 3,
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
    return queryInterface.bulkDelete('auth_user_roles', null, {});
  }
};
