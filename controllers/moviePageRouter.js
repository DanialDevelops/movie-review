const router = require('express').Router();
const { Review, User, Movie } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', async (req, res) => {
//     try {
//         const reviewData = await Review.findAll({
//         include: [
//           {
//             model: User,
//             attributes: ['username'],
//           },
//         ],
//       });
//       const reviews = reviewData.map((review) => review.get({ plain: true }));
//       res.render('home', {
//         reviews,
//         logged_in: req.session.logged_in
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

//   router.get('/review/:id', async (req, res) => {
//     try {
//       const reviewData = await Review.findByPk(req.params.id, {
//         include: [
//           {
//             model: User,
//             attributes: ['username'],
//           },
//         ],
//       });

//       const review = reviewData.get({ plain: true });

//       res.render('review', {
//         ...review,
//         logged_in: req.session.logged_in
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

router.get('/:id', withAuth, async (req, res) => {
  try {
    console.log(req.session.selectedMovie);
    res.render('movie', {
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
