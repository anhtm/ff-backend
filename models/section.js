'use strict';
module.exports = (sequelize, DataTypes) => {
  var Section = sequelize.define(
    'Section',
    {
      name: DataTypes.STRING,
      total_items: DataTypes.INTEGER
    },
    {}
  );
  Section.associate = function(models) {
    // associations can be defined here
    Section.belongsTo(models.User);
  };
  return Section;
};
