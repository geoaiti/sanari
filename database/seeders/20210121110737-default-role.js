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
        is_default : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        group: 2,
        permission: 8,
        is_default : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        group: 3,
        permission: 9,
        is_default : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        group: 4,
        permission: 10,
        is_default : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        group: 1,
        permission: 11,
        is_default : 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        group: 2,
        permission: 12,
        is_default : 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        group: 3,
        permission: 13,
        is_default : 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        group: 4,
        permission: 14,
        is_default : 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        group: 1,
        permission: 6,
        is_default : 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        group: 2,
        permission: 6,
        is_default : 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        group: 3,
        permission: 6,
        is_default : 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        group: 4,
        permission: 6,
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
    return queryInterface.bulkDelete('auth_roles', null, {});
  }
};
