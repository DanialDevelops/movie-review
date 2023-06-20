const router = require('express').Router();
const { Watchlist, User, Review } = require('../models');
const movieSearch = require('../utils/moviesDb');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    const userID = req.session.user_id;
    const watchlistData = await Watchlist.findAll({
        where: {
            user_id: userID,
        },
    });
    const movieList = watchlistData.map((movie) => movie.get({ plain: true }));

    const movieDataPromises = movieList.map((movie) => movieSearch.getMovie(movie.imdb_id));
    const movieData = await Promise.all(movieDataPromises);

    // reviews fetch
    // const reviewPromises = movieList.map(async(movie) => {
    //     const response = await axios.get(`/api/review/${movie.id}`);
    //     const review = response.data;
    //     return review;
    // });
    
    // console.log(reviewPromises);
    // console.log(watchlistData);
    res.render('watchlist', {
        logged_in: true,
        movieData,
        // reviewPromises
    });
});

module.exports = router;