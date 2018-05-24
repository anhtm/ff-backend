const { db } = require('./config/db');
const { Section } = require('../section');
const { User } = require('../user');
const Sequelize = require('sequelize');

var Item = db.define('item', 
{
	id: { type: Sequelize.INTEGER, primaryKey: true },
 	name: { type: Sequelize.TEXT, allowNull: false },
 	done: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
 	date_added: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
 	expired: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
},
//options
{ underscored: true })

Item.belongsTo(User);
Item.belongsTo(Section);

module.exports = {Item};