'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    'User',
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {
      timestamps: false
    }
  );
  User.associate = function(models) {
    // associations can be defined here
    // User.hasMany(models.Item);
    // User.hasMany(modesl.Section);
    // User.hasMany(models.Activity);
  };
  return User;
};
