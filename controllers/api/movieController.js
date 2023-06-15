const router = require('express').Router();
const { getAllMovies, getMovie } = require('../../utils/moviesDb');
const { User, Review } = require('../../models');
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
          attributes: ['id', 'rating', 'content', 'createdAt', 'updatedAt'],
          include: {
            model: User,
            attributes: ['id', 'username'],
          },
        });

        movie.avgRating = getAvgRating(reviews);
        movie.reviewsCount = reviews.length;
        movie.reviews = reviews;

        return movie;
      })
    );

    res.json(moviesWithReviews);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Internal server error. Could not get movies.' });
    throw new Error(err);
  }
});

// Search for a specific movie by id.
router.get('/:id', async (req, res) => {
  try {
    const movie = await getMovie(req.params.id);

    if (!movie) {
      res.status(404).json({ message: 'Movie not found.' });
      return;
    }

    const reviews = await Review.findAll({
      where: {
        imdb_id: movie.id,
      },
      attributes: ['id', 'rating', 'content', 'createdAt', 'updatedAt'],
      include: {
        model: User,
        attributes: ['id', 'username'],
      },
    });

    movie.avgRating = getAvgRating(reviews);
    movie.reviewsCount = reviews.length;
    movie.reviews = reviews;

    res.json(movie);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Internal server error. Could not get movie.' });
    throw new Error(err);
  }
});

module.exports = router;
