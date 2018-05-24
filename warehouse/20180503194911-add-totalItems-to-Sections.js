'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Sections', 'total_items', Sequelize.INTEGER);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Sections', 'total_items');
  }
};
