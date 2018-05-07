'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    'User',
    {
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false }
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
