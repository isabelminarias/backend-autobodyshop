const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');
const carsRoutes = require('./routes/cars');
const appRoutes = require('./routes/app');
const loginRoutes = require('./routes/login')
const path = require('path');
const db = require('./models/db'); //coneccion con mysql esta aqui
//const cors = require('cors');
const app = express();

//Settings
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.port || 3000 );
app.set('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//Routes
app.use(indexRoutes);
app.use('/api/user/',usersRoutes);
app.use('/api/car/', carsRoutes);
app.use('/api/apps/', appRoutes);
app.use('/api/login/', loginRoutes)


app.get('/', (req, res) => {
    res.render({message: 'main page'});
})




app.listen('3000', () => {
    console.log('server started on port 3000');
})