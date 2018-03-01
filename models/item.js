var mysql = require('mysql2')
var Sequelize = require('sequelize')
var sequelize = require('./db')

const Item = sequelize.define('item', {
    itemID: {
      type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true
    },
    itemName: {
        type: Sequelize.STRING, allowNull: false
    },
    itemQuantity: {
    type: Sequelize.INTEGER, allowNull: false
    },
    itemDescription: {
        type: Sequelize.INTEGER
    },
    itemCarMake: {
        type: Sequelize.INTEGER
    },
    itemCarModel: {
        type: Sequelize.INTEGER
    },
    itemType: {
        type: Sequelize.INTEGER, allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });


module.exports = Item