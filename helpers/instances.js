const User = require('../models').User;

// console.log('hello'); {
var user = {};
User.findById(1).then(u => {
  user = u;
});

module.exports = { user };
