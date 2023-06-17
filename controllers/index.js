const routes = require('express').Router();

const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

routes.get('/', (req, res) => {
  res.render('home');
});

routes.use('/', homeRoutes);
routes.use('/api', apiRoutes);

module.exports = routes;
