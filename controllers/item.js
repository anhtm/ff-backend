const Item = require('../models/').Item;
const Activity = require('../models').Activity;
const { sendResult, sendJSONResult } = require('../helpers/resSenders');
const _ = require('lodash');

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
      where: { user_id: req.user.id, id: req.params.item_id }
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
      user_id: req.user.id
    })
      .then(newItem => {
        res.json(newItem);
      })
      .catch(err => {
        res.json(err);
      });
  },

  update(req, res) {
    var body = _.pick(req.body, [
      'done',
      'expired',
      'isFavorite',
      'section',
      'name'
    ]);
    Item.update(body, {
      where: {
        id: req.params.item_id,
        user_id: req.user.id
      }
    })
      // TODO: separate update-done vs update-expired
      .then(() => {
        res.status(200).send();
      })
      .catch(function(err) {
        res.status(400).send(err);
      });
  },

  delete(req, res) {
    Item.destroy({
      where: {
        id: req.params.item_id,
        user_id: req.user.id
      }
    })
      // TODO: fix bug - can't add to Activity since item_id is cascaded
      .then(() => {
        res.status(200).send();
      })
      .catch(err => {
        res.status(400).send();
      });
  }
};
