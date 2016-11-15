var mongoose = require('mongoose');
var schema = mongoose.Schema;
var schema =  new schema({
    CategoryId:Number,
    CategoryName:String,
    Description:String,
    Picture:String


})
schema.set('collection','categories');
module.exports = mongoose.model('categories',schema);