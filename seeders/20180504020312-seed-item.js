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
          createdAt: new Date(),
          updatedAt: new Date(),
          food_id: 6,
          section_id: 1
        },
        {
          name: 'beef',
          done: false,
          expired: false,
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          food_id: 34,
          section_id: 2
        },
        {
          name: 'eggs',
          done: false,
          expired: false,
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          food_id: 21,
          section_id: 3
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {}
};
