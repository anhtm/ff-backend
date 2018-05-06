'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define(
    'Item',
    {
      name: DataTypes.STRING,
      done: DataTypes.BOOLEAN,
      expired: DataTypes.BOOLEAN,
      food_id: DataTypes.INTEGER
    },
    {
      underscore: true,
      timestamps: false,
      createdAt: {
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        defaultValue: DataTypes.NOW
      }
    }
  );
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsTo(models.Section, { foreignKey: 'section_id' });
    Item.belongsTo(models.User, { foreignKey: 'user_id' });
  };
  return Item;
};
