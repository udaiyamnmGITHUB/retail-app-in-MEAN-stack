var mongoose = require('mongoose');
var schema = mongoose.Schema;
var schema =  new schema({
    OrderID:String,
    CustomerID:String,
    EmployeeID:String,
    OrderDate:String,
    RequiredDate:String,
    ShipppedDate:String,
    ShipVia:String,
    Freight:String,
    ShipName:String,
    ShipAddress:String,
    ShipCity:String,
    ShipRegion:String,
    ShipPostalCode:String,
    ShipCountry:String
})
schema.set('collection','orders');
module.exports = mongoose.model('orders',schema);