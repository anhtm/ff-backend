'use strict';
module.exports = (sequelize, DataTypes) => {
  var Section = sequelize.define(
    'Section',
    {
      name: DataTypes.STRING
    },
    {
      underscore: true,
      timestamps: false
    }
  );
  Section.associate = function(models) {
    // associations can be defined here
    Section.belongsTo(models.User, { foreignKey: 'user_id' });
  };
  return Section;
};
