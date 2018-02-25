var mysql = require('mysql2')
var Sequelize = require('sequelize')
var sequelize = require('./db')

const Admin = sequelize.define('admin', {
    adminID: {
      type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true
    },
    active: {
      type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 1
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });

module.exports = Admin