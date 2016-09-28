const path = require("path");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const  dotenv = require("dotenv");
dotenv.load({ path: '.env.config' });

const dbObj = require('./app/config/mongo-db-config');

const app = express();
dbObj.northWindRetailMongoDb();


// catch the uncaught errors that weren't wrapped in a domain or try catch statement
// do not use this in modules, but only in applications, as otherwise we could have multiple of these bound
process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log('process error is caught' + err.stack);
});

// connecting to northwind db

//northWindRetailMongoDb.connectToDb();
require('./app/config/express-config')(app, express);
require('./app/config/passport-config')(app);

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
