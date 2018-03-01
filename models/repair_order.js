var mysql = require('mysql2')
var Sequelize = require('sequelize')
var sequelize = require('./db')

const repairOrder = sequelize.define('repair_order', {
    repair_orderID: {
      type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true
    },
    appID: {
        type: Sequelize.INTEGER, allowNull: false
    },
    managerID: {
    type: Sequelize.INTEGER, allowNull: false
    },
    mechanicID: {
        type: Sequelize.INTEGER
      },
    finished: {
    type: Sequelize.BOOLEAN
    },
    dateStarted: {
      type: Sequelize.DATE, allowNull: false
    },
    dateFinished: {
      type: Sequelize.DATE
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });


module.exports = repairOrder