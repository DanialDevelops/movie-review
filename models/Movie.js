const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Movie extends Model {}

// Once we get the third-party Movie api, the schema will look like:
// We no longer need this model once we get movie data from Mahdi's api.

Movie.init(
  {
    imdb_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    avg_rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    reviews_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'movie',
  }
);

module.exports = Movie;
