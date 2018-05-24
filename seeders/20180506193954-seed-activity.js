'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Activities', [
      {
        action: 'c',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        action: 'u',
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        action: 'd',
        user_id: 1,
        item_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Activities', null, {});
  }
};
