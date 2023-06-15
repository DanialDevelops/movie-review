const router = require('express').Router();
const { getAllMovies, getMovie } = require('../../utils/moviesDb');
// - /api/movie

// Search for a list of movies (10 max).
router.get('/search/:movie', async (req, res) => {
  try {
    const movies = await getAllMovies(req.params.movie);

    if (!movies.length) {
      res.status(404).json({ message: 'No movies found.' });
      return;
    }

    res.json(movies);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Internal server error. Could not get movies.' });
    throw new Error(err);
  }
});

// Search for a specific movie by imdb_id.
router.get('/:id', async (req, res) => {
  try {
    const movie = await getMovie(req.params.id);

    if (!movie) {
      res.status(404).json({ message: 'Movie not found.' });
      return;
    }

    res.json(movie);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Internal server error. Could not get movie.' });
    throw new Error(err);
  }
});

module.exports = router;
