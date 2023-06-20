const router = require('express').Router();
const { getAllMovies, getMovie } = require('../../utils/moviesDb');
const { Review } = require('../../models');
const { getAvgRating } = require('../../utils/helpers.js');
// - /api/movie

// Search for a list of movies (10 max).
router.get('/search/:movie', async (req, res) => {
  try {
    const movies = await getAllMovies(req.params.movie);

    if (!movies.length) {
      res.status(404).json({ message: 'No movies found.' });
      return;
    }

    const moviesWithReviews = await Promise.all(
      movies.map(async (movie) => {
        const reviews = await Review.findAll({
          where: {
            imdb_id: movie.id,
          },
          attributes: ['rating'],
        });
        if (reviews.length) {
          movie.avgRating = getAvgRating(reviews).toFixed(1);
        }
        movie.reviewsCount = reviews.length;
        return movie;
      })
    );

    res.json(moviesWithReviews);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Internal server error. Could not get movies.' });
    console.error(err);
  }
});

router.post('/session', async (req, res) => {
  try {
    req.session.selectedMovie = req.body;
    res.status(200).json(req.session.selectedMovie);
  } catch (err) {
    res.status(500).end();
    console.error(err);
  }
});

router.delete('/session', async (req, res) => {
  try {
    req.session.selectedMovie = null;
    res.status(200).end();
  } catch (err) {
    res.status(500).end();
    console.error(err);
  }
});

module.exports = router;
