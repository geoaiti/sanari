'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('auth_permissions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      application: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      modul: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      metode : {
        allowNull: false,
        type: Sequelize.STRING
      },
      title : {
        allowNull : false,
        type : Sequelize.STRING,
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
    await queryInterface.dropTable('auth_permissions');
  }
};