const router = require('express').Router();
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const Car = require('../models/car');
const mailjet = require('../models/mailjet')


//Car form to create new car instances
router.get('/', (req, res, next) => {
    res.render('../views/car.ejs')
})

//Trial for a mail sender
router.get('/:id/mail', (req, res)=> {
    Car.findOne({
        where: {
            carID: req.params.id
        }
    }).then(c => {
        const carModel = c.model;
        const carMake = c.make;
        const carYear = c.year;
        Client.findOne({
            where: {
                clientID: c.owner
            }
        }).then(cl => {
            User.findOne({
                where:{
                    userID: cl.clientUser
                }
            }).then(u =>{ 
                
                const emailAddress = u.email
                console.log('email address '+emailAddress)
                const emailData = {
                    'FromEmail': 'jayparkautobodyshop@gmail.com',
                    'FromName': `Jay's Auto Body Shop`,
                    'Subject': 'HTML test',
                    'Text-Part': "Hello, dear ! Your car has been appointed: We're waiting for your Make Model Year at our shop.",
                    'Html-Part': ` <h1>Hello, dear ${u.name}!</h1><br> <h2>Your car has been appointed at the bodyshop:</h2><br> <p>We're waiting for your ${carMake} ${carModel} (${carYear}). Hope to see you soon!</p><br> <p>omg its working FINALLY! El attatchment sera nuestro QR later on.</p>` ,
                    'Recipients': [{'Email': `${emailAddress}`}],
                    'Attachments': [{
                      "Content-Type": "text-plain",
                      "Filename": "qr.txt",
                      "Content": "VGhpcyBpcyB5b3VyIGF0dGFjaGVkIGZpbGUhISEK", // Base64 for "This is your attached file!!!" 
                    }]
                }
                
                mailjet.request(emailData)
                    .then(response => {
                    res.send(response)
                })
                    .catch(err => {
                        res.send(err)
                    }) 
            } )
        })
    })
    

    


    
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
//Detail by carID
router.get('/details/:id', (req, res)=> {
    var car = req.params.id;
    Car.findOne({
        where:{
            carID: car
        }
    })
    .then(c => {
        User.findOne({
            where: { userID: c.owner }
        }).then(
            u=> {
                res.json({
                    'carID': c.carID,
                    'model': c.model,
                    'make': c.make,
                    'year': c.year, 
                    'owner': u.name, 
                    'ownermail': u.email, 
                    'owneruser': u.username,
                    'ownerdate': u.createdAt,
                    'new': c.new, 
                    'image': c.image,
                    'createdAt': c.createdAt,
                    'updatedAt': c.updatedAt
                })
            }
        )
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

//Find User by CarID:
router.get('/client/:id', (req, res) =>{
    Car.findOne({
        where:{
            carID: req.params.id
        }
    }).then(
        car => { 
            User.findOne({
                where:{ userID: car.owner}
            }).then(
                user => {
                    res.json(user)
                }
            )
        }
    )
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