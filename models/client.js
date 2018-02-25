var mysql = require('mysql2')
var Sequelize = require('sequelize')
var sequelize = require('./db')

const Client = sequelize.define('client', {
    clientID: {
      type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true
    },
    bio: {
      type: Sequelize.STRING, allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });

module.exports = Client