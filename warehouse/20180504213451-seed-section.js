'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sections', [
      {
        name: 'refrigerator',
        user_id: 1
      },
      {
        name: 'freezer',
        user_id: 1
      },
      {
        name: 'pantry',
        user_id: 1
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sections', null, {});
  }
};
