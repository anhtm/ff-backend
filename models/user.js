'use strict';
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const { encryptPassword } = require('../helpers/hashing');
const { secret } = require('../config/secret-phrase');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    'User',
    {
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isLongEnough: function(val) {
            if (val.length < 8) {
              throw new Error('Please choose a longer password');
            }
          }
        }
      },
      token: { type: DataTypes.STRING }
    },
    {
      timestamps: false
    }
  );
  User.associate = function(models) {};

  User.prototype.generateAuthToken = function() {
    var access = 'auth';
    var token = jwt.sign({ id: this.id, access }, secret.phrase).toString();
    return User.update(
      {
        token: token
      },
      {
        where: {
          id: this.id
        }
      }
    ).then(() => {
      return token;
    });
  };

  User.prototype.toJSON = function() {
    var user = this;
    return _.pick(user.dataValues, ['id', 'first_name', 'last_name', 'email']);
  };

  User.findByToken = function(token) {
    var decoded;
    try {
      decoded = jwt.verify(token, secret.phrase);
    } catch (e) {
      return Promise.reject();
    }
    return User.findOne({
      where: {
        id: decoded.id,
        token: token
      }
    });
  };

  User.findByCredentials = function(email, password) {
    return User.findOne({
      where: {
        email: email
      }
    }).then(user => {
      if (!user) {
        return Promise.reject();
      }
      return bcrypt
        .compare(password, user.password)
        .then(res => {
          if (res) {
            return user;
          }
        })
        .catch(err => {
          return err;
        });
    });
  };

  User.beforeCreate((user, options) => {
    return encryptPassword(user.password)
      .then(res => {
        user.password = res;
      })
      .catch(err => {
        if (err) console.log(err);
      });
  });

  return User;
};
