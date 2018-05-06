'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sections', [
      {
        name: 'refrigerator',
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: 1
      },
      {
        name: 'freezer',
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: 1
      },
      {
        name: 'pantry',
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: 1
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sections', null, {});
  }
};
