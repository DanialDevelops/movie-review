// Include necessary modules
const Sequelize = require('sequelize');
require('dotenv').config();

// Create a new Sequelize instance, using environment variables for the parameters
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT,
  define: {
    timestamps: false
  }
});

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

// Export the sequelize instance
module.exports = sequelize;
