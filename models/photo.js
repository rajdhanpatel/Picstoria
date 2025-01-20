const { DataTypes } = require('sequelize');
const sequelize = require('../lib/db');

const photo = sequelize.define('photo', {
  imageUrl: DataTypes.STRING,
  description: DataTypes.STRING,
  altDescription: DataTypes.STRING,
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Sequelize supports arrays for Postgres
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' }
  }
});

module.exports = photo;