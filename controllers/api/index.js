const router = require('express').Router();
const userRouter = require('./userController.js');
const reviewRouter = require('./reviewController.js');
const watchlistRouter = require('./watchlistController.js');

router.use('/user', userRouter);
router.use('/review', reviewRouter);
router.use('/watchlist', watchlistRouter);

module.exports = router;
