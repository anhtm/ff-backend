'use strict';
const jwt = require('jsonwebtoken');
const { secret } = require('../config/secret-phrase');

var createToken = id => {
  var token = jwt.sign({ id: id, access: 'auth' }, secret.phrase).toString();
  return token;
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          first_name: 'John',
          last_name: 'Doe',
          email: 'johndoe@test.com',
          password: 'helloworld',
          token: createToken(1)
        },
        {
          first_name: 'Jane',
          last_name: 'Dovey',
          email: 'janedovey@test.com',
          password: 'helloworld2',
          token: createToken(2)
        },
        {
          first_name: 'minh',
          last_name: 'anh',
          email: 'minhanh@test.com',
          password: 'helloworld3',
          token: createToken(3)
        },
        {
          first_name: 'Pratt',
          last_name: 'San',
          email: 'prattsan@test.com',
          password: 'helloworld4',
          token: createToken(4)
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sections', null, {});
  }
};
