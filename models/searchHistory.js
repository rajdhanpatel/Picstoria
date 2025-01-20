const { DataTypes } = require('sequelize');
const sequelize = require('../lib/db');

const searchHistory= sequelize.define('searchHistory', {
  userId: {
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' }
  },
  query: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = searchHistory;
