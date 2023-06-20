const router = require('express').Router();

const userRoutes = require('./userRouter');
const movieRoutes = require('./moviePageRouter');
const apiRoutes = require('./api');

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

router.use('/api', apiRoutes);

module.exports = router;
