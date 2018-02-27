const router = require('express').Router();
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
db = require('../models/structure');
//Models
Appointment = require ('../models/appointment');
Car = require('../models/car');
Client = require('../models/client')



module.exports = router;