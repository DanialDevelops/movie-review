const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class movie extends Model {}

movie.init(
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      release_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.DECIMAL(3, 1),
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