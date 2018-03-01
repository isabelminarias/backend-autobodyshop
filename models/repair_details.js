var mysql = require('mysql2')
var Sequelize = require('sequelize')
var sequelize = require('./db')

const repairDetail = sequelize.define('repair_detail', {
    repair_detailID: {
      type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true
    },
    repair_orderID: {
        type: Sequelize.INTEGER, allowNull: false
    },
    itemID: {
    type: Sequelize.INTEGER, allowNull: true
    },
    img: {
        type: Sequelize.BLOB
      },
    comment: {
    type: Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });


module.exports = repairDetail