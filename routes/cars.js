const router = require('express').Router();
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const Car = require('../models/car');

//Car form to create new car instances
router.get('/', (req, res, next) => {
    res.render('../views/car.ejs')
})

//Get car listing
router.get('/all', (req, res) => {
    var list;
    Car.findAll()
    .then(results => {
        res.json(results)
    })
} ) 

// Get car by Owner ID
router.get('/owner/:id', (req, res) => {
    var client = req.params.id;
    Car.findAll({
        where:{
            owner: client
        }
    })
    .then(r => {
        res.json(r);
    })
})

// Get car by Car ID
router.get('/:id', (req, res) => {
    var car = req.params.id;
    Car.findAll({
        where:{
            carID: car
        }
    })
    .then(r => {
        res.json(r);
    })
})

// Update Car (id) sans Image
router.put('/:id', (req, res) => {
    var car = req.params.id;
    Car.findOne({
        where:{
            carID: car
        }
    })
    .then(c => {
        c.updateAttributes({
            model: req.body.model,
            make: req.body.make,
            year: req.body.year,
            new: req.body.new,
            plate: req.body.plate
        })
    })
})

//Find by make/manufacturer (m)
router.get('/make/:m', (req, res) => {
    var make = req.params.m
    Car.findAll({
        where: {
            make: make
        }
    })
    .then(cars => {
        res.json(cars)
    })
})

//Find by year (yr)
router.get('/year/:yr', (req, res) => {
    var year = req.params.yr
    Car.findAll({
        where: {
            year: year
        }
    })
    .then(cars => {
        res.json(cars)
    })
})

//Find by model (m)
router.get('/model/:m', (req, res) => {
    var model = req.params.m
    Car.findAll({
        where: {
            model: model
        }
    })
    .then(cars => {
        res.json(cars)
    })
})

//Find by plate number (num)
router.get('/plate/:num', (req, res) => {
    var num = req.params.num
    Car.findOne({
        where: {
            plate: num
        }
    })
    .then(car => {
        res.json(cars)
    })
})

//Post method for car form with default blank image 
router.post('/add', (req, res) => {
    var info = req.body
    Car.create({model: req.body.model, make: req.body.make, year: req.body.year, 
                    plate: req.body.plate, owner: 1, new: req.body.new, owner: req.body.owner})
    .then(c => {
        res.json(c);
    })
})

module.exports = router;