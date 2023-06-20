const router = require('express').Router();
const { Review, User, Movie } = require('../models');
const withAuth = require('../utils/auth');

// -> /

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  } else res.render('signup');
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Review }],
    });

    const user = userData.get({ plain: true });
    const movies = [
      { movie: 'The Matrix', rating: 5 },
      { movie: 'The Matrix Reloaded', rating: 4 },
      { movie: 'The Matrix Revolutions', rating: 3 },
    ];
    res.render('profile', {
      user,
      logged_in: true,
      movies,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
