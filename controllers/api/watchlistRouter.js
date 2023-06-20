const router = require('express').Router();
const { User, Watchlist } = require('../../models/');
const userRouter = require('./userRouter.js');
// - /api/watchlist




// GET all watchlists
router.get('/', async (req, res) => {

  try {
    console.log("its working ");
    const watchlistData = Watchlist.findAll({
      include: [{ model: User }],
  });
    res.status(200).json(watchlistData);
  } catch (err) {
    res.status(422).json(err);
  }
});

router.get('/:id', async (req, res) => {

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
  }
});

// POST one watchlist
router.post('/', async (req, res) => {  
  try {
    const watchlistData = await Watchlist.create(req.body);
    res.status(200).json(watchlistData);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
