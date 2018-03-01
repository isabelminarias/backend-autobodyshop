const router = require('express').Router();
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const sequelize = require('./db');


//Models in the Database
user = require('./user');
car = require('./car');
client = require('./client');
mechanic = require('./mechanic');
admin = require('./admin')
manager = require('./manager')
appointment = require('./appointment')
conditionDetails = require('./condition-details')
condition = require('./condition')
itemData = require('./item-data')


const db = {
    user: user,
    car: car,
    client: client,
    mechanic: mechanic,
    manager: manager,
    admin: admin,
    appointment: appointment,
    conditionDetails : conditionDetails,
    condition : condition,
    itemData : itemData
}

//Associations
//db.user.hasMany(db.car);

//db.client.belongsTo(db.user, {as: 'userID'});
db.mechanic.belongsTo(db.user);
db.admin.belongsTo(db.user);
db.manager.belongsTo(db.user)

db.car.hasMany(db.appointment, {
    foreignKey: {
        name: 'carID',
        allowNull: false
    }
})


db.client.hasMany(db.car, {
    foreignKey: {
        name: 'owner',
        allowNull: false
    }
})

db.condition.hasMany(db.conditionDetails, {
    foreignKey:{
        name: 'conditionsID',
        allowNull: false
    }
})
db.conditionDetails.hasOne(db.itemData, {
    foreignKey: {
        name: 'ItemDataID',
        allowNull: false
    }
})

module.exports = db;
