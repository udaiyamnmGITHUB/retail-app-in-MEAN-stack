const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const passport = require("passport");
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo')(session);
const  dotenv = require("dotenv");

dotenv.load({ path: '.env.config' });


// app settings

// catch the uncaught errors that weren't wrapped in a domain or try catch statement
// do not use this in modules, but only in applications, as otherwise we could have multiple of these bound
process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log('process error is caught' + err.stack);
});

const app = express();
app.set('port', process.env.port || 3000);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './app/views'));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}));
app.use(flash());
app.use(expressValidator());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// connecting to northwind DB

mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI, function(){
    console.log('mongodb is connected with' + process.env.MONGODB_URI);
}); 
mongoose.connection.on('error', function(){
    console.log('error in connection with  ' + process.env.MONGODB_URI);
      process.exit(1);
});

//Routes
var authenticationRoutesConfig = require('./app/authentication/authentication-routes');
var employeeRoutes = require('./app/employees/employee-routes');

app.use('/auth', authenticationRoutesConfig);
app.use('/employee', employeeRoutes);

app.get('/', function(req, res){
    res.render('home', {title:'Home'});
});


app.listen(app.get('port'), function(){
    console.log("app is listening on port # " + app.get('port'));
});
