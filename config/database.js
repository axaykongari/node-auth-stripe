const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config')[env];

// Create a new Sequelize instance with your database configuration
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: 'mysql', // or 'postgres', 'sqlite', etc.
//   logging: false, // Disable logging; default: console.log
// });

const sequelize = new Sequelize(config.database, config.username, config.password, config);

module.exports = sequelize;