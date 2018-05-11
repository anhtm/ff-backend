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
      // password: {
      //   type: DataTypes.VIRTUAL,
      //   allowNull: false,
      //   set: function(val) {
      //     // Remember to set the data value, otherwise it won't be validated
      //     this.setDataValue('password', val);
      //     this.setDataValue('password_hash', this.salt + val);
      //   },
      //   validate: {
      //     isLongEnough: function(val) {
      //       if (val.length < 8) {
      //         throw new Error('Please choose a longer password');
      //       }
      //     }
      //   }
      // }
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

  return User;
};
