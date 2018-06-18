'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Items',
      [
        {
          name: 'chicken',
          done: true,
          food_id: 113,
          section_id: 2,
          expired: false,
          user_id: 3
        },
        {
          name: 'strawberries',
          done: false,
          food_id: 481,
          section_id: 1,
          expired: true,
          user_id: 1
        },
        {
          name: 'ham',
          done: false,
          food_id: 108,
          section_id: 3,
          expired: false,
          user_id: 4
        },
        {
          name: 'kimchi',
          done: false,
          food_id: 493,
          section_id: 1,
          expired: false,
          user_id: 2
        },
        {
          name: 'cheese',
          done: true,
          food_id: 3,
          section_id: 1,
          expired: true,
          user_id: 1
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Items', null, {});
  }
};
