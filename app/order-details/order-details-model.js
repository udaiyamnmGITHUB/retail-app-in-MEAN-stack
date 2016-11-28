var mongoose = require('mongoose');
var schema = mongoose.Schema;
var schema =  new schema({
    OrderID:String,
    ProductID:String,
    UnitPrice:String,
    Quantity:String,
    Discount:String
});
schema.set('collection','order_details');
module.exports = mongoose.model('order_details',schema);