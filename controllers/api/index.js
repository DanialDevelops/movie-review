const router = require('express').Router();
const userRouter = require('./userRouter.js');
const movieRouter = require('./movieRouter.js');
const reviewRouter = require('./reviewRouter.js');
const watchlistRouter = require('./watchlistRouter.js');

router.use('/user', userRouter);
router.use('/movie', movieRouter);
router.use('/review', reviewRouter);
router.use('/user/watchlist', watchlistRouter);

module.exports = router;
