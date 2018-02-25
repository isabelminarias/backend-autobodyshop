var mysql = require('mysql2')
var Sequelize = require('sequelize')
var sequelize = require('./db')

const Appointment = sequelize.define('appointment', {
    appointmentID: {
      type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true
    },
    date: {
      type: Sequelize.DATE, allowNull: false
    },
    tollservice: {
      type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0
    },
    active: {
        type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 1
      },
    serviceDetail: {
      type: Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });


module.exports = Appointment