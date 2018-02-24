const router = require('express').Router();
const db = require('../models/structure');

router.get('/', (req, res) => {
    res.render('home');
})

router.get('/api/car/all', (req, res) => {
    var list;
    db.car.findAll()
    .then(results => {
        res.json(results)
    })
} ) 
router.get('/api/car/add', (req, res) => {
    res.render('car');
})

router.post('/api/car/add', (req, res) => {
    var info = req.body
    db.car.create({model: req.body.model, make: req.body.make, year: req.body.year, plate: req.body.plate, owner: 1, new: req.body.new})
    .then(c => {
        res.json(c);
    })
})
module.exports = router;