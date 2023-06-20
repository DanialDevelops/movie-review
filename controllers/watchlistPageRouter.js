const router = require('express').Router();
const { Review, Movie, Watchlist } = require('../models');
const withAuth = require('../utils/auth');
const { getMovie } = require('../utils/moviesDb');

// -> /watchlist

router.get('/', withAuth, async (req, res) => {
  const currentUser = req.session.user_id;
  try {
    const watchlistData = await Watchlist.findAll({
      where: {
        user_id: currentUser,
      },
      attributes: {
        exclude: ['user_id'],
      },
    });
    const watchlist = await Promise.all(
      watchlistData.map(async (watchlist) => {
        watchlist.get({ plain: true });
        const movie = await getMovie(watchlist.imdb_id);
        return movie;
      })
    );

    res.render('watchlist', {
      watchlist,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error. Failed to load watchlist page.',
    });
    console.error(err);
  }
});

module.exports = router;
