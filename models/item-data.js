var mysql = require('mysql2')
var Sequelize = require('sequelize')
var sequelize = require('./db')

const ItemData = sequelize.define('item_data', {
    itemTypeID: {
      type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true
    },
    carSection: {
        type: Sequelize.STRING
    },
    carSubsection: {
    type: Sequelize.STRING
    },
    itemDescription: {
        type: Sequelize.STRING
      },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });


module.exports = ItemData