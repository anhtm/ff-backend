const userRoutes = require('./controllers/user');
const itemRoutes = require('./controllers/item');
const activityRoutes = require('./controllers/activity');
const { authenticate } = require('./helpers/authenticate');

module.exports = app => {
  app.get('/', (req, res) => {
    res.send('Hello world');
  });
  app.get('/users', userRoutes.index);
  app.get('/user/id/:id', userRoutes.show);
  app.get('/user/me', authenticate, userRoutes.showInPrivate);
  app.post('/user', userRoutes.create);
  app.put('/user/:id', userRoutes.update);
  app.delete('/user/:id', userRoutes.delete);

  app.get('/items', authenticate, itemRoutes.index);
  app.get('/item/:item_id', authenticate, itemRoutes.showWithUserId);
  app.post('/item', authenticate, itemRoutes.create);
  app.put('/item/:item_id', authenticate, itemRoutes.update);
  app.delete('/item/:item_id', authenticate, itemRoutes.delete);

  app.get('/activities', authenticate, activityRoutes.index);
  app.post('/login', userRoutes.validate);
  app.put('/logout', authenticate, userRoutes.invalidate);
};
