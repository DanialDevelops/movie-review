const router = require('express').Router();
const { User, Watchlist } = require('../../models/');
// - /api/watchlist

// GET all watchlists
router.get('/', async (req, res) => {
<<<<<<< HEAD

  try {
    console.log("its working ");
    const watchlistData = Watchlist.findAll({
      include: [{ model: User }],
  });
    res.status(200).json(watchlistData);
  } catch (err) {
    res.status(422).json(err);
=======
  if (req.session.logged_in) {
    try {
      console.log('its working ');
      const watchlistData = Watchlist.findAll({
        include: [{ model: User }],
      });
      res.status(200).json(watchlistData);
    } catch (err) {
      res.status(422).json(err);
    }
  } else {
    res
      .status(401)
      .json({ message: 'You must be logged in to view this page.' });
>>>>>>> 146d7aa704a3c2f9c31d2213be2fdd5e1f3b874c
  }
});

router.get('/:id', async (req, res) => {
<<<<<<< HEAD

  try {
    const watchlistData = await Watchlist.findByPk(req.params.id, {
      include: [{ model: User }],
    });
    if (!watchlistData) {
      res.status(404).json({ message: 'No watchlist found with this id!' });
    return;
    }
    else{
      res.status(200).json(watchlistData);
    }
    res.status(200).json(watchlistData);
  } catch (err) {
    res.status(500).json(err);
=======
  if (req.session.logged_in) {
    try {
      const watchlistData = await Watchlist.findByPk(req.params.id, {
        include: [{ model: User }],
      });
      if (!watchlistData) {
        res.status(404).json({ message: 'No watchlist found with this id!' });
        return;
      } else {
        res.status(200).json(watchlistData);
      }
      res.status(200).json(watchlistData);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res
      .status(401)
      .json({ message: 'You must be logged in to view this page.' });
>>>>>>> 146d7aa704a3c2f9c31d2213be2fdd5e1f3b874c
  }
});

// POST one watchlist
<<<<<<< HEAD
router.post('/', async (req, res) => {  
  try {
    const watchlistData = await Watchlist.create(req.body);
    res.status(200).json(watchlistData);
  } catch (err) {
    res.status(400).json(err);
=======
router.post('/:movie', async (req, res) => {
  if (req.session.logged_in) {
    try {
      const watchlistData = await Watchlist.create({
        imdb_id: req.params.movie,
        user_id: req.session.user_id,
      });
      res.status(200).json(watchlistData);
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res
      .status(401)
      .json({ message: 'You must be logged in to view this page.' });
>>>>>>> 146d7aa704a3c2f9c31d2213be2fdd5e1f3b874c
  }
});

module.exports = router;
