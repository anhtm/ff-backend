'use strict';
module.exports = (sequelize, DataTypes) => {
  var Activity = sequelize.define(
    'Activity',
    {
      action: DataTypes.STRING
    },
    {
      underscore: true,
      timestamps: true,
      createdAt: {
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        defaultValue: DataTypes.NOW
      }
    }
  );
  Activity.associate = function(models) {
    // associations can be defined here
    // will add item_id & section_id to Activity as FK
    Activity.belongsTo(models.Item, { foreignKey: 'item_id' });
    // Activity.belongsTo(models.Section, { foreignKey: 'section_id' });
    Activity.belongsTo(models.User, { foreignKey: 'user_id' });
  };
  return Activity;
};
