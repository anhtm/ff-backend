'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Item.belongsTo(Section)
    // Item.belongsTo(User)

    // return queryInterface
    //   .addColumn('Items', 'section_id', {
    //     type: Sequelize.INTEGER,
    //     references: {
    //       model: 'Sections',
    //       key: 'id'
    //     }
    //   })
    //   .then(() => {

    return queryInterface.addColumn('Items', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    // return queryInterface.removeColumn('Items', 'section_id').then(() => {
    // return queryInterface.removeColumn('Items', 'user_id');
  }
};
