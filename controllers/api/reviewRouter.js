const router = require('express').Router();
const { User, Review } = require('../../models');
// - /api/review

// GET all reviews
router.get('/', async (req, res) => {
  try {
    const rawReviews = await Review.findAll({
      include: {
        model: User,
        attributes: ['username'],
      },
    });
    const reviews = await rawReviews.map((rawReview) => {
      return rawReview.get({ plain: true });
    });
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal server error. Could not GET reviews.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const review = await Review.create({
      imdb_id: req.body.imdb_id,
      content: req.body.content,
      rating: req.body.rating,
      user_id: req.session.user_id,
    });
    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal server error. Could not POST review.' });
  }
});

module.exports = router;
