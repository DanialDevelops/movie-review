const router = require('express').Router();
const { Review, User } = require('../models');
const withAuth = require('../utils/auth');
const { getMovie } = require('../utils/moviesDb');

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
      attributes: {
        exclude: ['id', 'password'],
      },
      include: [
        {
          model: Review,
          attributes: ['imdb_id', 'content', 'rating', 'createdAt'],
        },
      ],
    });

    const user = userData.get({ plain: true });
    const reviews = await Promise.all(
      user.reviews.map(async (review) => {
        const movieData = await getMovie(review.imdb_id);
        if (movieData) review.title = movieData.title;
        return review;
      })
    );
    console.log(reviews);
    res.render('profile', {
      user,
      logged_in: req.session.logged_in,
      reviews,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
