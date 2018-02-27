const router = require('express').Router();
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
User = require('../models/user');
Client = require('../models/client')
Mechanic = require('../models/mechanic')
Manager = require('../models/manager')
Admin = require('../models/admin')
db = require('../models/structure');
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

router.post('/user/add', (req, res) => {
    var info = req.body;
    User.create({name: info.cname, username: info.username, email: info.email, password: info.password, type: info.usertype  })
        .then(u => {
            console.log('userID = '+ u.toJSON().userID);
            console.log('type'+u.toJSON().type);
            t = u.toJSON().type
            if(t == 1){
                Client.create({
                    clientUser: u.toJSON().userID,
                    bio: 'Fill this with any information you want us to know about yourself!'
                })
                .then(c => {
                    console.log(c.toJSON());
                })
            }
            else if(t ==2){
                console.log('mechanic')
                Mechanic.create({
                    userID: u.toJSON().userID
                })
                .then(c => {
                    console.log(c.toJSON());
                })
            }
            else if(t == 3){
                console.log('manager')
                Manager.create({
                    userID: u.toJSON().userID
                })
                .then(c => {
                    console.log(c.toJSON());
                })
            }
            else if(t==4){
                console.log('admin')
                Admin.create({
                    userID: u.toJSON().userID
                })
                .then(c => {
                    console.log(c.toJSON());
                })
            }

        })
    res.redirect('/api/user/list');
})

router.put('/:id/passwordSet', (req, res) => {
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

//Query de todos los usuarios segun el tipo de usuario, y el total de usuarios de ese tipo
router.get('/all/:t', (req, res) => {
    var usertype = req.params.t;
    User.findAndCount({
        where: {
            type: usertype
        }
    })
    .then( r => {
        res.json(r);
    })
})

router.get('/:id/info', (req, res) => {
    
})
module.exports = router;