const router = require('express').Router();
const { User, Watchlist } = require('../../models/');

// GET all watchlists
router.get('/', async (req, res) => {
  try {
    const rawWatchlists = await Watchlist.findAll({
      include: {
        model: User,
        attributes: ['username'],
      },
    });
    const watchlists = await rawWatchlists.map((rawWatchlist) => {
      return rawWatchlist.get({ plain: true });
    });
    res.json(watchlists);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal server error. Could not GET watchlists.' });
  }
});

module.exports = router;
