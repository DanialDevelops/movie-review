const router = require('express').Router();

const userRoutes = require('./userRouter');
const movieRoutes = require('./moviePageRouter');
const apiRoutes = require('./api');
const watchlist = require('./watchlistRouter');
const { Watchlist } = require('../models');



// Homepage.
router.get('/', async (req, res) => {
  try {
    const loggedIn = req.session.logged_in || false;
    res.render('home', {
      logged_in: loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// HTML routes.
router.use('/', userRoutes);
router.use('/movie', movieRoutes);
router.use('/user/watchlist', watchlist);

// API routes.
router.use('/api', apiRoutes);



module.exports = router;
