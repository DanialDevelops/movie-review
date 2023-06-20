const router = require('express').Router();

const userRoutes = require('./userRouter');
const movieRoutes = require('./moviePageRouter');
const apiRoutes = require('./api');

// Homepage.
router.get('/', async (req, res) => {
  try {
    res.render('home', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// HTML routes.
router.use('/', userRoutes);
router.use('/movie', movieRoutes);

router.use('/api', apiRoutes);

module.exports = router;
