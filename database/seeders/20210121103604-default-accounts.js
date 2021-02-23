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
    return queryInterface.bulkInsert('auth_accounts', [
      {
        id: 1,
        userId : 1,
        username: 'dev',
        password: require('./../../config/helper').sha(`1-!P@ssw0rd`),
        email: `developer@${process.env.APP_NAME || 'sanari'}.id`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId : 2,
        username: 'admin',
        password: require('./../../config/helper').sha(`2-!P@ssw0rd`),
        email: `admin@${process.env.APP_NAME || 'sanari'}.id`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        userId : 3,
        username: 'dashboard',
        password: require('./../../config/helper').sha(`3-!P@ssw0rd`),
        email: `dashboard@${process.env.APP_NAME || 'sanari'}.id`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        userId : 4,
        username: 'user',
        password: require('./../../config/helper').sha(`4-!P@ssw0rd`),
        email: `user@${process.env.APP_NAME || 'sanari'}.id`,
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
    return queryInterface.bulkDelete('auth_accounts', null, {});
  }
};
