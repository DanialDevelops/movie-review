const routes = require('express').Router();
const apiRoutes = require('./api');

routes.get('/', (req, res) => {
  res.render('home');
});

routes.use('/api', apiRoutes);

module.exports = routes;
