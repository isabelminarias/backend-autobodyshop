var mysql = require('mysql2')
var Sequelize = require('sequelize')
var sequelize = require('./db')
var db = require('./structure');

//Connection to the database in MySQL

  const Car = sequelize.define('car', {
    carID: {
      type: Sequelize.INTEGER, 
      primaryKey: true, 
      autoIncrement: true
    }, 
    owner: {
        type: Sequelize.INTEGER, 
        allowNull: false
    },
    model: {
        type: Sequelize.STRING, allowNull: false
    },
    make: {
      type: Sequelize.STRING, allowNull: false
    },
    year: {
      type: Sequelize.INTEGER, allowNull: false
    },
    plate: {
      type: Sequelize.STRING, allowNull: false, unique: true
    },
    new: {
      type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true
    },
    image: {
      type: Sequelize.BLOB('long'), allowNull: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });


module.exports = Car;

