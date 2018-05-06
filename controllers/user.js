const User = require('../models/').User;
const Item = require('../models/').Item;

module.exports = {
  index(req, res) {
    User.findAll()
      .then(function(users) {
        sendResult(res, users);
      })
      .catch(function(error) {
        sendError(res, error);
      });
  },

  show(req, res) {
    User.findById(req.params.id)
      .then(function(user) {
        sendResult(res, user);
      })
      .catch(function(error) {
        sendError(res, error);
      });
  },

  create(req, res) {
    console.log(req.body);
    return User.create(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
      },
      { fields: ['first_name', 'last_name', 'email'] }
    )
      .then(function(newUser) {
        sendResult(newUser);
      })
      .catch(function(error) {
        sendError(res, error);
      });
  },

  update(req, res) {
    User.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(function(updatedUser) {
        sendResult(res, updatedUser);
      })
      .catch(function(err) {
        sendError(res, err);
      });
  },
  delete(req, res) {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(deletedUser) {
        sendResult(res, deletedUser);
      })
      .catch(function(err) {
        sendError(res, err);
      });
  }
};

// helper functions
function sendResult(res, result) {
  res.status(200).json(result);
}

function sendError(res, result) {
  res.status(500).json(result);
}
