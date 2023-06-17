const Watchlist = require('../models/Watchlist.js');
const Review = require('../models/Review.js');
const Movie = require('../models/Movie.js');
const User = require('../models/User');

// Many to many
User.belongsToMany(Movie, {
  through: Watchlist,
  timestamps: false,
  foreignKey: 'user_id',
});
Movie.belongsToMany(User, {
  through: Watchlist,
  timestamps: false,
  foreignKey: 'imdb_id',
});

// One to many
User.hasMany(Review, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Review.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = {
  Watchlist,
  Review,
  Movie,
  User,
};
