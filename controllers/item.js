const User = require('../models/').User;
const Item = require('../models/').Item;
const Activity = require('../models').Activity;

module.exports = {
  index(req, res) {
    Item.findAll({
      where: { user_id: req.params.user_id }
    })
      .then(function(items) {
        sendResult(res, items);
      })
      .catch(function(error) {
        sendError(res, error);
      });
  },
  show(req, res) {
    Item.findById(req.params.item_id)
      .then(function(item) {
        sendResult(res, item);
      })
      .catch(function(error) {
        sendError(res, error);
      });
  },
  showWithUserId(req, res) {
    Item.findOne({
      where: { user_id: req.params.user_id, id: req.params.item_id }
    })
      .then(item => {
        res.json(item);
      })
      .catch(error => {
        res.json(error);
      });
  },
  create(req, res) {
    Item.create({
      name: req.body.name,
      food_id: req.body.food_id,
      section: req.body.section,
      user_id: req.params.user_id
    })
      .then(function(newItem) {
        res.json(newItem);
        return Activity.create({
          action: 'c',
          user_id: req.params.user_id,
          item_id: newItem.dataValues.id
        });
      })
      .then(function(newActivity) {
        console.log('New activity added: Item created');
      })
      .catch(function(error) {
        res.json(error);
      });
  },
  update(req, res) {
    Item.update(req.body, {
      where: {
        id: req.params.item_id
      }
    })
      .then(function(updatedItem) {
        return Activity.create({
          action: 'u',
          user_id: req.params.user_id,
          item_id: req.params.item_id
        });
      })
      .then(newActivity => {
        console.log('New activity added: Item updated');
      })
      .catch(function(err) {
        res.json(err);
      });
  },
  delete(req, res) {
    Item.destroy({
      where: {
        id: req.params.item_id
        // user_id: req.params.user_id
      }
    })
      .then(function(deletedItem) {
        res.json(deletedItem);
        console.log(deletedItem._previousDataValues);
        return Activity.create({
          action: 'd',
          user_id: req.params.user_id,
          item_id: req.params.item_id
        });
      })
      .then(newActivity => {
        console.log('New activity added: Item deleted');
      })
      .catch(function(err) {
        res.json(err);
      });
  }
};

// helper functions
function sendResult(res, result) {
  res.status(200).json(result);
}

function sendError(res, result) {
  res.status(500).json(result);
}
