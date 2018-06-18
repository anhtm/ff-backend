const User = require('../models/').User;
const { sendResult, sendJSONResult } = require('../helpers/resSenders');
const _ = require('lodash');

module.exports = {
  index: (req, res) => {
    User.findAll()
      .then(users => {
        sendResult(res, 200, users);
      })
      .catch(err => {
        sendResult(res, 400, err);
      });
  },

  show: (req, res) => {
    User.findById(req.params.id)
      .then(user => {
        if (!user) {
          sendResult(res, 404, null);
        }
        sendResult(res, 200, user);
        // console.log(user);
      })
      .catch(err => {
        sendResult(res, 400, err);
      });
  },

  showInPrivate: (req, res) => {
    console.log(res.token);
    res.send(req.user);
  },

  create: (req, res) => {
    var newUser = User.build(req.body);
    newUser
      .save()
      .then(() => {
        return newUser.generateAuthToken();
      })
      .then(token => {
        res.header('x-auth', token).send(newUser.toJSON());
      })
      .catch(err => {
        sendResult(res, 400, err);
      });
  },

  update: (req, res) => {
    var body = _.pick(req.body, [
      'first_name',
      'last_name',
      'email',
      'password'
    ]);
    User.update(body, {
      where: {
        id: req.params.id
      }
    })
      .then(() => {
        sendJSONResult(res, 200);
        sendJSONResult({ message: 'Successfully updated user' });
      })
      .catch(err => {
        sendResult(res, 400, err);
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
  },

  validate: (req, res) => {
    User.findByCredentials(req.body.email, req.body.password)
      .then(user => {
        return user.generateAuthToken().then(token => {
          res.header('x-auth', token).send(user);
        });
      })
      .catch(e => {
        res.status(400).send(e);
      });
  },

  invalidate: (req, res) => {
    req.user
      .removeToken()
      .then(() => {
        res.status(200).send();
      })
      .catch(err => {
        res.status(400).send();
      });
  }
};
