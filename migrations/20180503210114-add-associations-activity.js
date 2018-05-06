'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn('Activities', 'user_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      })
      .then(() => {
        return queryInterface.addColumn('Activities', 'item_id', {
          type: Sequelize.INTEGER,
          references: {
            model: 'Items',
            key: 'id'
          }
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Activities', 'user_id').then(() => {
      return queryInterface.removeColumn('Activities', 'item_id');
    });
  }
};
