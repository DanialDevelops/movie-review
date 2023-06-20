const router = require('express').Router();
const { Review, User, Movie } = require('../models');
const withAuth = require('../utils/auth');
const getMovie = require('../utils/moviesDb');

// -> /movie

router.get('/:id', withAuth, async (req, res) => {
  try {
    let movie;
    // Check if movie already exists in db.
    const movieData = await Movie.findByPk(req.params.id);

    if (!movieData) {
      movie = await getMovie(req.params.id);
      res.render('movie', {
        ...movie,
        logged_in: req.session.logged_in,
      });
      return;
    }

    movie = movieData.get({ plain: true });
    if (req.session.selectedMovie.reviewsCount) {
      console.log('HELLLOOOOO');
    }

    res.render('movie', {
      ...movie,
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
