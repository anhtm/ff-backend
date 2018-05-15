const Sequelize = require('sequelize');
const { db } = require('./config/db');
const { Item } = require('../item');
const { Section } = require('../section');
const { Activity } = require('../activity');

var User = db.define('user', {
	id: { type: Sequelize.INTEGER, primaryKey: true },
 	name: { type: Sequelize.STRING, allowNull: false },
 	email: { type: Sequelize.STRING, allowNull: false},
 	//password
},
{ underscored: true })

// will add user_id to Item, Section, and Activity
User.hasMany(Item, {as: 'items'});
User.hasMany(Section, {as: 'sections'});
User.hasMany(Activity, {as: 'activities'});

module.exports = {User};