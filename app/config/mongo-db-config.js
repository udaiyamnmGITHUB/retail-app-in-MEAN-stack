const mongoose = require('mongoose');

exports.northWindRetailMongoDb = function() {

    mongoose.connect(process.env.MONGOLAB_URI, function () {
        console.log('mongodb is connected with' + process.env.MONGOLAB_URI);
    });
    mongoose.connection.on('error', function () {
        console.log('error in connection with  ' + process.env.MONGOLAB_URI);
        process.exit(1);
    });
}