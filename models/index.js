const Watchlist = require('../models/Watchlist');
const Review = require('../models/Review');
const Movie = require('../models/Movie');
const User = require('../models/User');

// One to one
User.hasOne(Watchlist, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Watchlist.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// One to many
User.hasMany(Review, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Review.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = {
  Watchlist,
  Review,
  Movie,
  User,
};
