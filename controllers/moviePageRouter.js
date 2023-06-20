const router = require('express').Router();
const { Review, User } = require('../models');
const withAuth = require('../utils/auth');
const { getMovie } = require('../utils/moviesDb');
const { getAvgRating } = require('../utils/helpers.js');

// -> /movie

router.get('/:id', withAuth, async (req, res) => {
  if (!req.session.logged_in) {
    res.status(401).end();
    return;
  }
  try {
    let selectedMovie;
    if (!req.session.selectedMovie) {
      selectedMovie = await getMovie(req.params.id);

      if (!selectedMovie) {
        res.status(404).json({ message: 'Movie not found.' });
        return;
      }

      const reviewsData = await Review.findAll({
        where: {
          imdb_id: selectedMovie.id,
        },
        attributes: ['rating', 'content', 'createdAt', 'updatedAt'],
        order: [['createdAt', 'DESC']],
        include: {
          model: User,
          attributes: ['username'],
        },
      });
      const reviews = reviewsData.map((review) => review.get({ plain: true }));

      selectedMovie.avgRating = getAvgRating(reviews).toFixed(1);
      selectedMovie.reviewsCount = reviews.length;
      selectedMovie.reviews = reviews;
    } else {
      selectedMovie = req.session.selectedMovie;

      if (req.session.selectedMovie.reviewsCount) {
        const reviewsData = await Review.findAll({
          where: {
            imdb_id: selectedMovie.id,
          },
          attributes: ['rating', 'content', 'createdAt', 'updatedAt'],
          order: [['createdAt', 'DESC']],
          include: {
            model: User,
            attributes: ['username'],
          },
        });
        const reviews = reviewsData.map((review) =>
          review.get({ plain: true })
        );
        selectedMovie.reviews = reviews;
      }
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
