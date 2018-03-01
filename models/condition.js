var mysql = require('mysql2')
var Sequelize = require('sequelize')
var sequelize = require('./db')

const Condition = sequelize.define('condition', {
    conditionID: {
      type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true
    },
    carID: {
        type: Sequelize.INTEGER, allowNull: false
    },
    appID: {
    type: Sequelize.INTEGER, allowNull: false
    },
    managerID: {
        type: Sequelize.INTEGER
      },
    diagnostic: {
      type: Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });


module.exports = Condition