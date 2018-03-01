var LONG_BLOB = require('mysql2/lib/constants/types') 
var mysql = require('mysql2')
var Sequelize = require('sequelize')
var sequelize = require('./db')

const ConditionDetails = sequelize.define('conditions_detail', {
    conditions_detailsID: {
      type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true
    },
    conditionsID: {
        type: Sequelize.INTEGER, allowNull: false
    },
    item_dataID: {
    type: Sequelize.INTEGER, allowNull: false
    },
    comment: {
        type: Sequelize.STRING
      },
    img: {
      type: Sequelize.BLOB(LONG_BLOB)
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });


module.exports = ConditionDetails