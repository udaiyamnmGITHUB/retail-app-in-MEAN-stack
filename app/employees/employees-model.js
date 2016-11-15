var mongoose = require('mongoose');
var schema = mongoose.Schema;
var schema =  new schema({
    EmployeeId:String,
    LastName:String,
    FirstName:String,
    Title:String,
    TitleOfCourtesy:String,
    BirthDate:String,
    HireDate:String,
    Address:String
})

schema.set('collection','employees');
module.exports = mongoose.model('employees',schema);