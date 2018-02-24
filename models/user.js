
var mysql = require('mysql2')
var Sequelize = require('sequelize')
var sequelize = require('./db')


  const User = sequelize.define('user', {
    userID: {
      type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true
    },
    name: {
      type: Sequelize.STRING, allowNull: false
    },
    username: {
      type: Sequelize.STRING, allowNull: false, unique: true
    },
    email: {
      type: Sequelize.STRING, allowNull: false, unique: true
    },
    password: {
      type: Sequelize.STRING, allowNull: false
    },
    type: {
      type: Sequelize.INTEGER, allowNull: false, defaultValue: 0
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });


module.exports = User;

