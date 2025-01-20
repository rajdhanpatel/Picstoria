const { Sequelize } = require('sequelize');
const config = require('../config/config')['development'];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "postgres",
    port: config.port,
  }
);

module.exports = sequelize;
