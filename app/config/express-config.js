const bodyParser = require('body-parser');
const path = require('path');
const flash = require('express-flash');
const expressValidator = require('express-validator');

//var cookieParser = require('cookie-parser');

module.exports = function (app, express) {
    
    app.set('port', process.env.port || 3000);
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    //app.use(cookieParser()); // read cookies (needed for auth)
    //app.use(bodyParser()); // get information from html forms
    app.set('view engine', 'pug');// set up pug for templating


<<<<<<< HEAD
    app.use(express.static(path.join(__dirname + '/../app')));
    app.set('views', path.join(__dirname, '../views'));
=======
    app.use(express.static(path.join(__dirname + '/../views')));
    app.set('views', path.join(__dirname, './app/views'));
>>>>>>> f5685128291c432629f13af84a1c007f292d837d

    app.use(flash());
    app.use(expressValidator());

    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

};