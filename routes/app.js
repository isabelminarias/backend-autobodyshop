const router = require('express').Router();
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
db = require('../models/structure');
//Models
App = require ('../models/appointment');
Car = require('../models/car');
Client = require('../models/client')
User = require('../models/user')


router.get('/', (req, res)=> {
    res.render('app')
})

router.get('/history', (req, res) => {
    App.findAll()
    .then(r => {
        res.json(r);
    })
})

//Get all active (aka not assigned) appointments
router.get('/all', (req, res) => {
    App.findAll({
        where:{
            active: false,
            finalized: false
        }
    })
    .then(r => {
        res.json(r)
    })
})
//Get all currently ongoing appointments
router.get('/wip', (req, res) => {
    App.findAll({
        where:{
            active:true, 
            finalized: false
        }
    })
    .then(r => {
        res.json(r)
    })
})

//Get all appointments related to a particular Car (by ID)
router.get('/history/:car', (req,res) => {
    App.findAll({
        where:{
            carID: req.params.car
        }
    })
    .then(r => {
        res.json(r)
    })
})

//Get la info de Cliente y de Usuario a partir del appID
router.get('/all/:appID', (req, res)=>{

    App.findOne({
        where:{
            appointmentID : req.params.appID
        }
    })
    .then(r => {
        Car.findOne({
            where:{
                carID: r.carID
            }
        })
        .then(c => {
            Client.findOne({
                where:{
                    clientID: c.owner
                }
            })
            .then( cl => {
                User.findOne({
                    where:{
                        userID: cl.clientUser
                    }
                }).
                then( u => {
                    res.json([ {Client: cl},{User: u}, {Car: c}, {Appointment: r}])
                })
            })
        })
    })
})

router.get('/')

// Get las apps que necesitan servicio de grua 
// (querify later to have only those in the current week)
router.get('/urgent', (req, res) => {
    App.findAll({
        where: {
            tollService: 1
        }
    })
    .then(aps => {
        res.json(aps)
    })
})
//Hacer un query que devuelva todas las apps que se realizaron entre startDate y endDate
router.post('/date', (req, res) => {
    var dates = req.body;
    res.json(dates)
})

//Cambio de estatus del app
router.put('/id/:app', (req, res) => {
    App.findOne({
        where:{
            appID: req.params.app
        }
    }).then(r => {
        r.UpdateAttributes({
            active: req.body.active
        });
        const mailAppID = r.appID
        Car.findOne({
            where:{ carID: r.carID }
        }).then(c => {
            Client.findOne({
                where: { clientID: c.owner}
            }).then(cl => {
                User.findOne({
                    where: {userID: cl.clientUser}
                }).then( u => {
                    const userEmail = u.email;
                    
                    if (req.body.active == true){
                        const emailAddress = u.email
                        console.log('email address '+emailAddress)
                        const emailData = {
                            'FromEmail': 'jayparkautobodyshop@gmail.com',
                            'FromName': `Jay's Auto Body Shop`,
                            'Subject': 'Your appointment has been set up!',
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
                    }

                })
            })
        })

        
    })
    res.redirect('/condition')
})


module.exports = router;