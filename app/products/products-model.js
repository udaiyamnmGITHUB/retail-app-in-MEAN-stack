var mongoose = require('mongoose');
var schema = mongoose.Schema;
var schema =  new schema({
  ProductID:String,
  ProductName:String,
  SupplierID:String,
  CategoryID:String,
  QuantityPerUnit:String,
  UnitPrice:String,
  UnitsInStock:String,
  UnitsOnOrder:String,
  ReorderLevel:String,
  Discontinued:String
})
schema.set('collection','products');
module.exports = mongoose.model('products',schema);