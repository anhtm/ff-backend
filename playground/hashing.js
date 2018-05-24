const bcrypt = require('bcryptjs');
const User = require('../models/').User;

var passwords = ['helloworld', 'helloworld2', 'helloworld3', 'helloworld4'];
var hashed = [];

for (pw of passwords) {
  bcrypt.hash(pw, 10, (err, hash) => {
    hashed.push(hash);
    console.log(hashed);
  });
}
