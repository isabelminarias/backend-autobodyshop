
var mysql = require('mysql2')
var Sequelize = require('sequelize')
var sequelize = require('./db')

const User = sequelize.define('user', 
  {
    userID: {
      type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true
    },
    username: {
      type: Sequelize.STRING, allowNull: false, unique: true
    },
    name: {
      type: Sequelize.STRING, allowNull: false 
    },
    email: {
      type: Sequelize.STRING, allowNull: false, unique:true 
    },
    password: {
      type: Sequelize.STRING, allowNull: false 
    },
    type: {
      type: Sequelize.INTEGER, allowNull: false, defaultValue: 0
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    classMethods: {
      findClients: () => {
        return this.findAll({
          where: {
            type: 1
          }
        })
      },
      findMechanics: () => {
        return this.findAll({
          where: {
            type: 2
          }
        })
      },
      findManagers: () => {
        return this.findAll({
          where: {
            type: 3
          }
        })
      },
      findAdmins: () => {
        return this.findAll({
          where: {
            type:4
          }
        })
      },
      findNonAssigned: () => {
        return this.findAll({
          where: {
            type: 0
          }
        })
      }
    }});

module.exports = User