const Item = require('../models/').Item;
const Activity = require('../models').Activity;
const { sendResult, sendJSONResult } = require('../helpers/resSenders');

module.exports = {
  index(req, res) {
    Item.findAll({
      where: { user_id: req.params.user_id }
    })
      .then(items => {
        sendResult(res, 200, items);
      })
      .catch(err => {
        sendResult(res, 400, err);
      });
  },

  show(req, res) {
    Item.findById(req.params.item_id)
      .then(item => {
        sendResult(res, item);
      })
      .catch(err => {
        sendError(res, err);
      });
  },

  showWithUserId(req, res) {
    Item.findOne({
      where: { user_id: req.params.user_id, id: req.params.item_id }
    })
      .then(item => {
        res.json(item);
      })
      .catch(err => {
        res.json(err);
      });
  },

  create(req, res) {
    Item.create({
      name: req.body.name,
      food_id: req.body.food_id,
      section: req.body.section,
      user_id: req.params.user_id
    })
      .then(newItem => {
        res.json(newItem);
        return Activity.create({
          action: 'c',
          user_id: req.params.user_id,
          item_id: newItem.dataValues.id
        });
      })
      .then(() => {
        console.log('New activity added: Item created');
      })
      .catch(err => {
        res.json(err);
      });
  },

  update(req, res) {
    Item.update(req.body, {
      where: {
        id: req.params.item_id
      }
    })
      // TODO: separate update-done vs update-expired
      .then(() => {
        return Activity.create({
          action: 'u',
          user_id: req.params.user_id,
          item_id: req.params.item_id
        });
      })
      .then(() => {
        console.log('New activity added: Item updated');
      })
      .catch(function(err) {
        res.json(err);
      });
  },

  delete(req, res) {
    Item.destroy({
      where: {
        id: req.params.item_id,
        user_id: req.params.user_id
      }
    })
      // TODO: fix bug - can't add to Activity since item_id is cascaded
      .then(() => {
        return Activity.create({
          action: 'd',
          user_id: req.params.user_id,
          item_id: req.params.item_id
        });
      })
      .then(() => {
        console.log('New activity added: Item deleted');
      })
      .catch(err => {
        res.json(err);
      });
  }
};
