'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define(
    'Item',
    {
      name: DataTypes.STRING,
      done: DataTypes.BOOLEAN,
      date_added: DataTypes.DATE,
      expired: DataTypes.BOOLEAN
    },
    {}
  );
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsTo(models.Section);
    Item.belongsTo(models.User);
  };
  return Item;
};
