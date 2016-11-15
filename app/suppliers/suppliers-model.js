var mongoose = require('mongoose');
var schema = mongoose.Schema;
var schema =  new schema({
   SupplierID:String,
   CompanyName:String,
   ContactName:String,
   ContactTitle:String,
   Address:String,
   City:String,
   Region:String,
   PostalCode:String,
   Country:String,
   Phone:String,
   Fax:String,
   HomePage:String
})
schema.set('collection','suppliers');
module.exports = mongoose.model('suppliers',schema);