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


const db = {
    user: user,
    car: car,
    client: client,
    mechanic: mechanic,
    manager: manager,
    admin: admin,
    appointment: appointment
}

//Associations
//db.user.hasMany(db.car);

db.client.belongsTo(db.user, {as: 'userID'});
db.mechanic.belongsTo(db.user);
db.admin.belongsTo(db.user);
db.manager.belongsTo(db.user)

db.appointment.belongsTo(db.client, {as: 'clientID'})
db.appointment.belongsTo(db.car, {as: 'carID'})

db.client.hasMany(db.car, {
    foreignKey: {
        name: 'owner',
        allowNull: false
    }
})


module.exports = db;
