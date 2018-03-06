const router = require('express').Router();
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

//Modelos
User = require('../models/user')
Client = require('../models/client')
Mechanic = require('../models/mechanic')
Manager = require('../models/manager')
Admin = require('../models/admin')
db = require('../models/structure');

//Secrets
const secrets = ['cheery client', 'muscled mechanic', 'mindful manager', 'almighty admin']

//Verificacion de que sea un usuario
router.post('/verify', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    User.findOne({
        where: {
            username: username,
            password: password
        }
    })
    .then(u => {
        if( u == null){
            res.json({'message': 'no user defined'}).status(404)
        }
        else{ 
            res.json(u)
        }
    })
})
router.get('/', (req, res) => {
    res.render('login.ejs')
})

module.exports = router