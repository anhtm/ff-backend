'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var Activity = sequelize.define(
    'Activity',
    {
      action: { type: DataTypes.STRING, allowNull: false },
      createdAt: {
        defaultValue: sequelize.literal('NOW()'),
        type: DataTypes.DATE
      },
      updatedAt: {
        defaultValue: sequelize.literal('NOW()'),
        type: DataTypes.DATE
      }
    },
    {
      underscore: true,
      timestamps: false
    }
  );
  Activity.associate = function(models) {
    Activity.belongsTo(models.Item, {
      foreignKey: 'item_id',
      onDelete: 'cascade',
      hooks: true
    });
    Activity.belongsTo(models.User, { foreignKey: 'user_id' });
    // Activity.belongsTo(models.Section, { foreignKey: 'section_id' });
  };
  return Activity;
};
