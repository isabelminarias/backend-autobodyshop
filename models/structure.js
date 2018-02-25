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

const db = {
    user: user,
    car: car,
    client: client,
    mechanic: mechanic,
    manager: manager,
    admin: admin
}

//Associations
//db.user.hasMany(db.car);
db.car.belongsTo(db.user, {as: 'owner'});
db.client.belongsTo(db.user, {as: 'userID'});
db.mechanic.belongsTo(db.user, {as: 'userID'});
db.admin.belongsTo(db.user, {as: 'userID'});
db.manager.belongsTo(db.user, {as: 'userID'})

db.client.hasMany(db.car);


module.exports = db;
