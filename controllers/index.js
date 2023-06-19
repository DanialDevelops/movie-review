const routes = require('express').Router();

const homeRoutes = require('./homeRoutes');
const movieRoutes = require('./movieRoutes');
const apiRoutes = require('./api');

routes.get('/', (req, res) => {
  res.render('home');
});

routes.use('/', homeRoutes);
routes.use('/', movieRoutes);
routes.use('/api', apiRoutes);

module.exports = routes;
