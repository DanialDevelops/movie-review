const routes = require('express').Router();

const homeRoutes = require('./homeRouter');
const movieRoutes = require('./moviePageRouter');
const apiRoutes = require('./api');

routes.use('/', homeRoutes);
routes.use('/movie', movieRoutes);
routes.use('/api', apiRoutes);

module.exports = routes;
