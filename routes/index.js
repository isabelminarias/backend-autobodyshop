const router = require('express').Router();
const db = require('../models/structure');

router.get('/', (req, res) => {
    res.render('home');
})


module.exports = router;