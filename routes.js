// 1. / -> GET landing page
// 2. /signin -> POST (signin to app & start session) + GET
// 3. /signup -> POST (create new user & send confirmation email) + GET
// 4. /signout -> GET (remove credentials from session)
// 5. /user/:user_id -> POST (update profile) + GET
// 6. /user/:user_id/section/:section_id -> GET (go to section + list items of section)
// 7. /user/:user_id/section/:section_id/:item_id -> POST + GET + PUT + DElETE (CRUD)
// 8. /user/:user_id/sections -> GET (list of sections)
// 9. /user/:user_id/activities -> GET (list of activities)
// 10. /user/:user_id/activity/:activity_id -> GET (a specific activity)

// ?? should /user/:user_id stay in the routes? Since there is always 1 user for each session.
// This should be done in /signin
const userRoutes = require('./controllers/user');
const itemRoutes = require('./controllers/item');
const activityRoutes = require('./controllers/activity');

module.exports = app => {
  app.get('/', (req, res) => {
    res.send('Hello world');
  });
  app.get('/users', userRoutes.index);
  app.get('/user/:id', userRoutes.show);
  app.post('/user', userRoutes.create);
  app.put('/user/:id', userRoutes.update);
  app.delete('/user/:id', userRoutes.delete);

  app.get('/:user_id/items', itemRoutes.index);
  app.get('/item/:item_id', itemRoutes.show);
  app.get('/:user_id/item/:item_id', itemRoutes.showWithUserId);
  app.post('/:user_id/item', itemRoutes.create);
  app.put('/:user_id/item/:item_id', itemRoutes.update);
  app.delete('/:user_id/item/:item_id', itemRoutes.delete);

  app.get('/:user_id/activities', activityRoutes.index);
};
