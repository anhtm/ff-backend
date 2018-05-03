const Sequelize = require('sequelize');
const { Item } = require('../item');
const { Section } = require('../section');
const { Activity } = require('../activity');
const { User } = require('../user');

exports.createTables = () => {
	User.create();
	Section.create();
	Item.create();
	Activity.create();
}
