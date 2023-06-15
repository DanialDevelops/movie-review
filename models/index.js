const Watchlist = require('../models/Watchlist');
const Review = require('../models/Review');
const Movie = require('../models/Movie');
const User = require('../models/User');
const MovieWatchlist = require('../models/MovieWatchlist');

// One to One
User.hasOne(Watchlist, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Watchlist.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// One to many
User.hasMany(Review, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Review.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

Movie.hasMany(Review, { foreignKey: 'imdb_id', onDelete: 'CASCADE' });
Review.belongsTo(Movie, { foreignKey: 'imdb_id', onDelete: 'CASCADE' });

// Many to many
Movie.hasMany(Watchlist, { through: MovieWatchlist });
Watchlist.belongsToMany(Movie, { through: MovieWatchlist });

module.exports = {
  Watchlist,
  Review,
  Movie,
  User,
};
