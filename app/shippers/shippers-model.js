var mongoose = require('mongoose');
var schema = mongoose.Schema;
var schema =  new schema({
   ShipperID:String,
   CompanyName:String,
   Phone:String
})
schema.set('collection','shippers');
module.exports = mongoose.model('shippers',schema);