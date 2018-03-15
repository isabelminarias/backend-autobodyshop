var express = require('express');
var router = express.Router();
let jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
//Modelo 
const user = require('../models/User');
const config = require('../config')

router.post('/signup', (req, res)=> {
    let user = User.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        type: req.body.usertype
    }).then(u => 
        console.log(u),
        res.redirect('/'));
})

router.post('/auth', (req, res)=> {
    let data = {
        username: req.body.username,
        password: req.body.password
    };
    User.findOne({
        where:{
            username: data.username,
            password: data.password
        }
    }).then((u, err) => {
        if (err){
            return res.json({error: true})
        }
        if(!u){
            return res.status(404).json({message: 'User not found!'})
        }
        console.log(u)
        let token = jwt.sign(user, config.jwt_secret, {
            expiresIn: 1440 //expires in 60 minutes i think?
        });
        res.json({error: false, token: token, user: u})
    })
})

module.exports = router;