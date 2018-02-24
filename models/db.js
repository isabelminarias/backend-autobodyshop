const router = require('express').Router();
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

//Connection to the database in MySQL
const datab = mysql.createConnection({
  host: '127.0.0.1',
  user: 'bodyshop',
  password: 'bodyshop',
  database: 'bodyshop'
});
datab.connect((err) => {
  if (err){
      console.log('mysql connection error... '+err);
  }
  console.log('mysql connected');
})

const sequelize = new Sequelize('bodyshop', 'bodyshop', 'bodyshop', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



module.exports = sequelize;