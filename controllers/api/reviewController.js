const router = require('express').Router();
const Review = require('../../models/Review.js');

// GET all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal server error. Could not GET reviews.' });
  }
});

// GET review by id
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      res.status(404).json({ message: 'Review not found.' });
      return;
    }
    res.json(review);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal server error. Could not GET review by id.' });
  }
});

router.post('/', async (req, res) => {
  // Request body should be
  // {
  //  "content": "This movie was awesome!"
  //  "rating": 1,
  //  "movie_id": 1,
  //  "user_id": 1
  // }
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal server error. Could not POST review.' });
  }
});

module.exports = router;
