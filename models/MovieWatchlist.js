const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class MovieWatchlist extends Model {}

MovieWatchlist.init(
  {
    imdb_id: {
      // An id of a movie from the third-party movie API.
      type: DataTypes.STRING,
      allowNull: false,
    },
    watchlist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'movie_watchlist',
  }
);

module.exports = MovieWatchlist;
