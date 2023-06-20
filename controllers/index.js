const router = require('express').Router();

const userRoutes = require('./userRouter');
const movieRoutes = require('./moviePageRouter');
const watchlistRoutes = require('./watchlistPageRouter');
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
<<<<<<< HEAD
router.use('/user/watchlist', watchlist);
=======
router.use('/watchlist', watchlistRoutes);
>>>>>>> 146d7aa704a3c2f9c31d2213be2fdd5e1f3b874c

// API routes.
router.use('/api', apiRoutes);



module.exports = router;
