const User = require('../models/').User;
const { sendResult, sendError } = require('../helpers/resSenders');

module.exports = {
  index: (req, res) => {
    User.findAll()
      .then(users => {
        sendResult(res, users);
      })
      .catch(err => {
        sendError(res, err);
      });
  },

  show: (req, res) => {
    User.findById(req.params.id)
      .then(user => {
        sendResult(res, user);
      })
      .catch(err => {
        sendError(res, err);
      });
  },

  create: (req, res) => {
    return User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    })
      .then(newUser => {
        res.json(newUser);
      })
      .catch(err => {
        res.json(err);
      });
  },

  update: (req, res) => {
    User.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(updatedUser => {
        res.json(updatedUser);
      })
      .catch(err => {
        res.json(err);
      });
  },

  delete: (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(deletedUser => {
        res.json(deletedUser);
      })
      .catch(err => {
        res.json(err);
      });
  }
};
