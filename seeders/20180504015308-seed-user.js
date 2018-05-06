'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          first_name: 'John',
          last_name: 'Doe',
          email: 'johndoe@test.com'
        },

        {
          first_name: 'Jane',
          last_name: 'Dovey',
          email: 'janedovey@test.com'
        },
        {
          first_name: 'minh',
          last_name: 'anh',
          email: 'minhanh@test.com'
        },
        {
          first_name: 'Pratt',
          last_name: 'San',
          email: 'prattsan@test.com'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sections', null, {});
  }
};
