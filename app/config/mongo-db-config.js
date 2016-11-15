const mongoose = require('mongoose');

exports.northWindRetailMongoDb = function() {

<<<<<<< HEAD
    mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGODB_URI, function () {
        console.log('mongodb is connected with' + process.env.MONGOLAB_URI || process.env.MONGODB_URI);
    });
    mongoose.connection.on('error', function () {
        console.log('error in connection with  ' + process.env.MONGOLAB_URI || process.env.MONGODB_URI);
=======
    mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI, function () {
        console.log('mongodb is connected with' + process.env.MONGODB_URI);
    });
    mongoose.connection.on('error', function () {
        console.log('error in connection with  ' + process.env.MONGODB_URI);
>>>>>>> f5685128291c432629f13af84a1c007f292d837d
        process.exit(1);
    });
}