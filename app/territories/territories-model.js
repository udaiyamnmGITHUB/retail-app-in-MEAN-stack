var mongoose = require('mongoose');
var schema = mongoose.Schema;
var schema =  new schema({
  TerritoryID:String,
  TerritoryDescription:String,
  RegionID:String
})
schema.set('collection','territories');
module.exports = mongoose.model('territories',schema);