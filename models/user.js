'use strict';
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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
    var token = jwt.sign({ id: this.id, access }, 'secret').toString();
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
      decoded = jwt.verify(token, 'secret');
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

  return User;
};
