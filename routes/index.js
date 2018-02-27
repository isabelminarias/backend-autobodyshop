const router = require('express').Router();
const db = require('../models/structure');

router.get('/', (req, res) => {
    res.render('home');
})

router.get('/api', (req, res) => {
    res.render('home', [{message: 'works', msg2: 'this is a trial'}, {mylove: 'work', really: 'pls work'}])
})


module.exports = router;