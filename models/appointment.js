var mysql = require('mysql2')
var Sequelize = require('sequelize')
var sequelize = require('./db')

const Appointment = sequelize.define('appointment', {
    appointmentID: {
      type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true
    },
    appointedDate: {
      type: Sequelize.DATE
    },
    tollservice: {
      type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0
    },
    active: {
      type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 1
    },
    finalized: {
      type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0
    },
    serviceDetail: {
      type: Sequelize.STRING
    },
    startDate: {
      type: Sequelize.DATE, allowNull: false
    },
    endDate: {
      type: Sequelize.DATE
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });


module.exports = Appointment