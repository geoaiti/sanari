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
        metode: 'GET',
        title: "Auth",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        application: 1,
        modul: 2,
        metode: 'GET',
        title: "Login",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        application: 1,
        modul: 2,
        metode: 'POST',
        title: "Login",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        application: 1,
        modul: 3,
        metode: 'GET',
        title: "Register",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        application: 1,
        modul: 3,
        metode: 'POST',
        title: "Register",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        application: 1,
        modul: 4,
        metode: 'GET',
        title: "Logout",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        application: 2,
        modul: 1,
        metode: 'GET',
        title: "Administrator",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        application: 3,
        modul: 1,
        metode: 'GET',
        title: "Admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        application: 4,
        modul: 1,
        metode: 'GET',
        title: "Dashboard",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        application: 5,
        modul: 1,
        metode: 'GET',
        title: "User",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        application: 2,
        modul: 5,
        metode: 'GET',
        title: "Profile",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        application: 3,
        modul: 5,
        metode: 'GET',
        title: "Profile",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        application: 4,
        modul: 5,
        metode: 'GET',
        title: "Profile",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        application: 5,
        modul: 5,
        metode: 'GET',
        title: "Profile",
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
