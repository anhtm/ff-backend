'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          first_name: 'John',
          last_name: 'Doe',
          createdAt: new Date(),
          updatedAt: new Date(),
          email: 'johnDoe@test.com'
        },
        {
          first_name: 'Minh',
          last_name: 'Anh',
          createdAt: new Date(),
          updatedAt: new Date(),
          email: 'minhanh@test.com'
        },
        {
          first_name: 'Jane',
          last_name: 'Dovey',
          createdAt: new Date(),
          updatedAt: new Date(),
          email: 'janeDovey@test.com'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', [
      {
        first_name: 'John'
      }
    ]);
  }
};
