'use strict';
var moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define(
    'Item',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      done: { type: DataTypes.BOOLEAN, defaultValue: false },
      expired: { type: DataTypes.BOOLEAN, defaultValue: false },
      food_id: { type: DataTypes.INTEGER, allowNull: false },
      section_id: { type: DataTypes.INTEGER, allowNull: false },
      isFavorite: { type: DataTypes.BOOLEAN, defaultValue: false },
      date_added: {
        type: DataTypes.DATEONLY,
        defaultValue: new Date(),
        allowNull: false,
        get: function() {
          return moment
            .utc(this.getDataValue('date_added'))
            .format('YYYY-MM-DD');
        }
      }
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
