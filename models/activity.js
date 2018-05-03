'use strict';
module.exports = (sequelize, DataTypes) => {
  var Activity = sequelize.define(
    'Activity',
    {
      timestamp: DataTypes.DATE
    },
    {}
  );
  Activity.associate = function(models) {
    // associations can be defined here
    // will add item_id & section_id to Activity as FK
    Activity.belongsTo(models.Item);
    Activity.belongsTo(models.Section);
    Activity.belongsTo(models.User);
  };
  return Activity;
};
