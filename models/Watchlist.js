const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Watchlist extends Model {}

Watchlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    imdb_ids: {
      // A JSON array of movie ids.
      type: DataTypes.JSON,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'watchlist',
  }
);

module.exports = Watchlist;
