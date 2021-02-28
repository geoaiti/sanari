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
    return queryInterface.bulkInsert('auth_permission_actions', [
      {
        id: 1,
        permission: 1,
        action: 1,
        data_argument : JSON.stringify([]),
        url_pattern : "/auth",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        permission: 2,
        action: 1,
        data_argument : JSON.stringify([]),
        url_pattern : "/auth/login",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        permission: 3,
        action: 1,
        data_argument : JSON.stringify([]),
        url_pattern : "/auth/login",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        permission: 4,
        action: 1,
        data_argument : JSON.stringify([]),
        url_pattern : "/auth/register",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        permission: 5,
        action: 1,
        data_argument : JSON.stringify([]),
        url_pattern : "/auth/register",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        permission: 6,
        action: 1,
        data_argument : JSON.stringify([]),
        url_pattern : "/auth/logout",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        permission: 7,
        action: 1,
        data_argument : JSON.stringify([]),
        url_pattern : "/administrator",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        permission: 8,
        action: 1,
        data_argument : JSON.stringify([]),
        url_pattern : "/admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        permission: 9,
        action: 1,
        data_argument : JSON.stringify([]),
        url_pattern : "/dashboard",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        permission: 10,
        action: 1,
        data_argument : JSON.stringify([]),
        url_pattern : "/user",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        permission: 11,
        action: 1,
        data_argument : JSON.stringify([]),
        url_pattern : "/administrator/profile",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        permission: 12,
        action: 1,
        data_argument : JSON.stringify([]),
        url_pattern : "/admin/profile",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        permission: 13,
        action: 1,
        data_argument : JSON.stringify([]),
        url_pattern : "/dashboard/profile",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        permission: 14,
        action: 1,
        data_argument : JSON.stringify([]),
        url_pattern : "/user/profile",
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
    return queryInterface.bulkDelete('auth_permission_actions', null, {});
  }
};
