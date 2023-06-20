const router = require('express').Router();
const { Review, User, Movie } = require('../models');
const withAuth = require('../utils/auth');
const getMovie = require('../utils/moviesDb');

// -> /movie

router.get('/:id', withAuth, async (req, res) => {
  try {
    const selectedMovie = req.session.selectedMovie;

    if (req.session.selectedMovie.reviewsCount) {
      const reviewsData = await Review.findAll({
        where: {
          imdb_id: selectedMovie.id,
        },
        attributes: ['rating', 'content', 'createdAt', 'updatedAt'],
        include: {
          model: User,
          attributes: ['username'],
        },
      });
      const reviews = reviewsData.map((review) => review.get({ plain: true }));
      selectedMovie.reviews = reviews;
    }

    res.render('movie', {
      ...selectedMovie,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Internal server error. Failed to load movie page.' });
    console.error(err);
  }
});

module.exports = router;
