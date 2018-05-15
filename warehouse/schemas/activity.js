const { db } = require('./config/db');
const { Item } = require('../item');
const { Section } = require('../section');
const { User } = require('../user');
const Sequelize = require('sequelize');

var Activity = db.define('activity', {
	id: { type: Sequelize.INTEGER, primaryKey: true },
 	timestamp: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
},
{ underscored: true })

// will add item_id & section_id to Activity as FK
Activity.belongsTo(Item);
Activity.belongsTo(Section);
Activity.belongsTo(User);

module.exports = {Activity};