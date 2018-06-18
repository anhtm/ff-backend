'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      done: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      food_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      section_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      expired: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isFavorite: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      date_added: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Items');
  }
};
