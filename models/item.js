'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define(
    'Item',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      done: { type: DataTypes.BOOLEAN, defaultValue: false },
      expired: { type: DataTypes.BOOLEAN, defaultValue: false },
      food_id: { type: DataTypes.INTEGER, allowNull: false },
      section: { type: DataTypes.STRING, allowNull: false }
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
    // Item.belongsTo(models.Section, { foreignKey: 'section_id' });
    Item.belongsTo(models.User, { foreignKey: 'user_id' });
  };
  return Item;
};
