const router = require('express').Router();
const { Review, Movie, Watchlist } = require('../models');
const withAuth = require('../utils/auth');

// -> /watchlist

router.get('/', withAuth, async (req, res) => {
  const currentUser = req.session.user_id;
  try {
    const watchlistData = await Watchlist.findAll({
      where: {
        user_id: currentUser,
      },
      include: {
        model: Movie,
        attributes: [],
      },
    });
    const watchlist = watchlistData.map((watchlist) =>
      watchlist.get({ plain: true })
    );
    console.log(watchlist);

    // res.render('watchlist', {
    //   watchlist,
    //   logged_in: req.session.logged_in,
    // });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error. Failed to load watchlist page.',
    });
    console.error(err);
  }
});

module.exports = router;
