var mongoose = require('mongoose');
var schema = mongoose.Schema;
var schema =  new schema({
    RegionID:String,
    RegionDescription:String
})
schema.set('collection','regions');
module.exports = mongoose.model('regions',schema);