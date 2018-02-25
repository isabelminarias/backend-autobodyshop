var mysql = require('mysql2')
var Sequelize = require('sequelize')
var sequelize = require('./db')

const Mechanic = sequelize.define('mechanic', {
    mechanicID: {
      type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true
    },
    userID: {
      type: Sequelize.INTEGER, allowNull: false
    },
    available: {
      type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 1
    },
    projectCount: {
      type: Sequelize.INTEGER, allowNull: false, defaultValue: 0
    },
    description: {
      type: Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });

module.exports = Mechanic