const router = require('express').Router();
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const Car = require('../models/car');

router.get('/add', (req, res, next) => {
    res.render('../views/car.ejs')
})

router.get('/all', (req, res) => {
    var list;
    Car.findAll()
    .then(results => {
        res.json(results)
    })
} ) 

router.post('/add', (req, res) => {
    var info = req.body
    Car.create({model: req.body.model, make: req.body.make, year: req.body.year, 
                    plate: req.body.plate, owner: 1, new: req.body.new, owner: req.body.owner})
    .then(c => {
        res.json(c);
    })
})

module.exports = router;