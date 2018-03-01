const router = require('express').Router();
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
db = require('../models/structure');
//Models
App = require ('../models/appointment');
Car = require('../models/car');
Client = require('../models/client')
User = require('../models/user')


router.get('/', (req, res)=> {
    res.render('app')
})

router.get('/history', (req, res) => {
    App.findAll()
    .then(r => {
        res.json(r);
    })
})

//Get all active (aka not assigned) appointments
router.get('/all', (req, res) => {
    App.findAll({
        where:{
            active: false,
            finalized: false
        }
    })
    .then(r => {
        res.json(r)
    })
})
//Get all currently ongoing appointments
router.get('/wip', (req, res) => {
    App.findAll({
        where:{
            active:true, 
            finalized: false
        }
    })
    .then(r => {
        res.json(r)
    })
})

//Get all appointments related to a particular Car (by ID)
router.get('/history/:car', (req,res) => {
    App.findAll({
        where:{
            carID: req.params.car
        }
    })
    .then(r => {
        res.json(r)
    })
})

//Get la info de Cliente y de Usuario a partir del appID
router.get('/all/:appID', (req, res)=>{

    App.findOne({
        where:{
            appointmentID : req.params.appID
        }
    })
    .then(r => {
        Car.findOne({
            where:{
                carID: r.carID
            }
        })
        .then(c => {
            Client.findOne({
                where:{
                    clientID: c.owner
                }
            })
            .then( cl => {
                User.findOne({
                    where:{
                        userID: cl.clientUser
                    }
                }).
                then( u => {
                    res.json([ {Client: cl},{User: u}, {Car: c}, {Appointment: r}])
                })
            })
        })
    })
})

router.get('/')

// Get las apps que necesitan servicio de grua 
// (querify later to have only those in the current week)
router.get('/urgent', (req, res) => {
    App.findAll({
        where: {
            tollService: 1
        }
    })
    .then(aps => {
        res.json(aps)
    })
})
//Hacer un query que devuelva todas las apps que se realizaron entre startDate y endDate
router.post('/date', (req, res) => {
    var dates = req.body;
    res.json(dates)
})


module.exports = router;