const routes = require('express').Router();

const homeRoutes = require('./homeRouter');
const movieRoutes = require('./moviePageRouter');
const apiRoutes = require('./api');

routes.get('/', (req, res) => {
  res.render('home');
});

routes.use('/', homeRoutes);
routes.use('/', movieRoutes);
routes.use('/api', apiRoutes);

module.exports = routes;
