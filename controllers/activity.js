const Activity = require('../models').Activity;

module.exports = {
  index(req, res) {
    Activity.findAll({
      where: { user_id: req.params.user_id }
    })
      .then(activities => {
        res.json(activities);
      })
      .catch(error => {
        res.json(error);
      });
  }
};
