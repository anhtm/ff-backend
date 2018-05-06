'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Items',
      [
        {
          name: 'cheese',
          done: false,
          expired: false,
          user_id: 1,
          food_id: 6,
          section: 'refrigerator'
        },
        {
          name: 'beef',
          done: false,
          expired: false,
          user_id: 2,
          food_id: 34,
          section: 'freezer'
        },
        {
          name: 'eggs',
          done: false,
          expired: false,
          user_id: 1,
          food_id: 21,
          section: 'refrigerator'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Items', null, {});
  }
};
