const User = require('../models/').User;

User.findByToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjZXNzIjoiYXV0aCIsImlhdCI6MTUyNjQwODIyNH0.nfwV-SPOKS9MQxrThjcq7MRNSAJNWYl-Sq6I_rljBLc'
).then(user => {
  console.log(user);
});
