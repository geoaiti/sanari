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
    // return queryInterface.bulkInsert('auth_menus', [
      // {
      //   id: 1,
      //   name: 'administrator',
      //   description: '',
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
    // ]);
    return queryInterface.bulkInsert('auth_menus', [
      {
        id: 1,
        name: 'Main',
        icon: '',
        parent_id: 0,
        permission: null,
        sorter: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Dashboard',
        icon: `<i data-feather="monitor" class="align-self-center vertical-menu-icon icon-dual-vertical"></i>`,
        parent_id: 1,
        permission: null,
        sorter: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Home',
        icon: `<i class="ti-control-record"></i>`,
        parent_id: 2,
        permission: 7,
        sorter: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Home',
        icon: `<i class="ti-control-record"></i>`,
        parent_id: 2,
        permission: 8,
        sorter: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Home',
        icon: `<i class="ti-control-record"></i>`,
        parent_id: 2,
        permission: 9,
        sorter: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: 'Home',
        icon: `<i class="ti-control-record"></i>`,
        parent_id: 2,
        permission: 10,
        sorter: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        name: 'Account',
        icon: '',
        parent_id: 0,
        permission: null,
        sorter: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        name: 'Profile',
        icon: `<i data-feather="grid" class="align-self-center vertical-menu-icon icon-dual-vertical"></i>`,
        parent_id: 7,
        permission: null,
        sorter: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        name: 'My Profile',
        icon: `<i class="ti-control-record"></i>`,
        parent_id: 8,
        permission: 11,
        sorter: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        name: 'My Profile',
        icon: `<i class="ti-control-record"></i>`,
        parent_id: 8,
        permission: 12,
        sorter: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        name: 'My Profile',
        icon: `<i class="ti-control-record"></i>`,
        parent_id: 8,
        permission: 13,
        sorter: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        name: 'My Profile',
        icon: `<i class="ti-control-record"></i>`,
        parent_id: 8,
        permission: 14,
        sorter: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        name: 'Logout',
        icon: `<i class="ti-control-record"></i>`,
        parent_id: 8,
        permission: 6,
        sorter: 13,
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
    return queryInterface.bulkDelete('auth_menus', null, {});
  }
};
