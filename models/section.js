const { db } = require('./config/db');
const { Item } = require('../item');
const { User } = require('../user');
const Sequelize = require('sequelize');

var Section = db.define('section', 
{
	id: { type: Sequelize.INTEGER, primaryKey: true },
 	name: { type: Sequelize.TEXT, allowNull: false },
 	total: { type: Sequelize.INTEGER, defaultValue: 0}
},
{ underscored: true })

// will add section_id to Item
Section.hasMany(Item, {as: 'items'});
Section.belongsTo(User);

module.exports = {Section};