const router = require('express').Router();
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const sequelize = require('./db');


//Models in the Database
user = require('./user');
car = require('./car');

const db = {
    user: user,
    car: car
}

//Associations
//db.user.hasMany(db.car);
//db.car.belongsTo(db.user);

module.exports = db;
