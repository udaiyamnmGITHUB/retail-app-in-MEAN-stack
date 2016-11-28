// changes 
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
var categoryRoutes = require('./app/categories/categories-routes');
var ordersRoutes = require('./app/orders/orders-routes');
var orderDetails = require('./app/order-details/order-details-routes');
var territoriesRoutes = require('./app/territories/territories-routes');
var suppliersRoutes = require('./app/suppliers/suppliers-routes');
var shippersRoutes = require('./app/shippers/shippers-routes');
var regionsRoutes = require('./app/regions/regions-routes');
var productsRoutes = require('./app/products/products-routes');

app.use('/auth', authenticationRoutesConfig);
app.use('/employee', employeeRoutes);
app.use('/categories', categoryRoutes);
app.use('/orders', ordersRoutes);
app.use('/orderDetails', orderDetails);
app.use('/territories', territoriesRoutes);
app.use('/suppliers', suppliersRoutes);
app.use('/shippers', shippersRoutes);
app.use('/regions', regionsRoutes);
app.use('/products', productsRoutes);




app.get('/', function(req, res){
    res.render('home', {title:'Home'});
});


app.listen(app.get('port'), function(){
    console.log("app is listening on port # " + app.get('port'));
});
