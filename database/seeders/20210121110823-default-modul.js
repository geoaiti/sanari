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
    return queryInterface.bulkInsert('auth_moduls', [
      {
        id: 1,
        name: 'Index',
        prefix: '',
        description: '',
        parent_id : 0,
        generation : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Login',
        prefix: 'login',
        description: '',
        parent_id : 0,
        generation : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Register',
        prefix: 'register',
        description: '',
        parent_id : 0,
        generation : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Logout',
        prefix: 'logout',
        description: '',
        parent_id : 0,
        generation : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Profile',
        prefix: 'profile',
        description: '',
        parent_id : 0,
        generation : 1,
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
    return queryInterface.bulkDelete('auth_moduls', null, {});
  }
};
