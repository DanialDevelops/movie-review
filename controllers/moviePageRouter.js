const router = require('express').Router();
const { Review, User, Movie } = require('../models');
const withAuth = require('../utils/auth');

// -> /movie

router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const reviews = reviewData.map((review) => review.get({ plain: true }));
    res.render('homepage', {
      reviews,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/movie/:id', async (req, res) => {
  try {
    const movieData = await Movie.findByPk(req.params.id);
    const movie = movieData.get({ plain: true });
    res.render('movie', {
      ...movie,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal server error. Failed to load movie page.' });
  }
});

module.exports = router;
