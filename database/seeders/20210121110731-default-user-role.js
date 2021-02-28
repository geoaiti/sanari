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
        group: 1,
        is_default : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        user: 2,
        group: 2,
        is_default : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        user: 3,
        group: 3,
        is_default : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        user: 4,
        group: 4,
        is_default : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        user: 1,
        group: 2,
        is_default : 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        user: 1,
        group: 4,
        is_default : 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        user: 1,
        group: 3,
        is_default : 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        user: 2,
        group: 3,
        is_default : 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        user: 2,
        group: 4,
        is_default : 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        user: 4,
        group: 3,
        is_default : 0,
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
