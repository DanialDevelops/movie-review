const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Watchlist extends Model {}

Watchlist.init(
  {
    imdb_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      foreignKey: true,
      references: {
        model: 'movie',
        key: 'imdb_id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      foreignKey: true,
      references: {
        model: 'user',
        key: 'id',
      },
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
