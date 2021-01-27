'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('auth_roles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      group: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      permission: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      is_default : {
        allowNull : false,
        type : Sequelize.INTEGER,
        defaultValue : 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('auth_roles');
  }
};