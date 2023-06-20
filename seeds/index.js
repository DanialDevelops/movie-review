const sequelize = require('../config/connection');
const { User, Review, Movie, Watchlist } = require('../models/');
const watchlists = require('./watchlist-seeds.json');
const reviews = require('./review-seeds.json');
const movies = require('./movie-seeds.json');
const users = require('./user-seeds.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    // Model.bulkCreate() ignores hooks. Use loops to use Model.create() instead
    // To hash passwords before injecting into db
    for (const user of users) {
      await User.create(user);
    }

    for (const movie of movies) {
      await Movie.create(movie);
    }

    for (const review of reviews) {
      await Review.create(review);
    }

    for (const watchlist of watchlists) {
      await Watchlist.create(watchlist);
    }
    console.log('Seed data created successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();
