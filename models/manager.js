var mysql = require('mysql2')
var Sequelize = require('sequelize')
var sequelize = require('./db')

const Manager = sequelize.define('manager', {
    managerID: {
      type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true
    },
    userID: {
      type: Sequelize.INTEGER, allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });

module.exports = Manager