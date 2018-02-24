const router = require('express').Router();
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
User = require('../models/user');
//app.use(bodyParser);
router.get('/add', (req, res, next) => {
    res.render('../views/user.ejs')
})

router.get('/list', (req, res, next) => {
    var list;
    User.findAll().then(result =>{
        //console.log(result)
        res.json(result);
    })
    });

router.get('/:id', (req, res) => {
    var id = req.params.id;
    User.findOne({
         where: {userID: id}, 
        }).then(results => {
            res.json(results);
        })
})

router.get('/', (req, res) => {
    res.render('user');
})

router.post('/addUser', (req, res) => {
    var info = req.body;
    User.create({name: info.cname, username: info.username, email: info.email, password: info.password, type: info.usertype  })
        .then(u => {
            console.log(info);
        })
    res.redirect('list');
})

router.put('/:id', (req, res) => {
    var id = req.body.id
    User.findOne({
        id: id
    })
    .then( u => {
        u.updateAttributes({
            password: req.body.password
        })
    })
})
module.exports = router;