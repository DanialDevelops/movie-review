const Watchlist = require('../models/Watchlist');
const Review = require('../models/Review');
const User = require('../models/User');

// One to Many
User.hasMany(Watchlist, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Watchlist.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

User.hasMany(Review, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Review.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = {
  Watchlist,
  Review,
  User,
};
