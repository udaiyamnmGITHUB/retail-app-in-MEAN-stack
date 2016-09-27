const mongoose = require("mongoose");

const userdetailSchema = mongoose.Schema({
local:{
    username : {type : String, required:true, unique:true, index:true},
    profile: {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    gender: { type: String, default: '' },
    profilePicture: { type: String, default: '' }
  }
}

});

const userdetailModel = mongoose.model('user', userdetailSchema);

module.exports = userdetailModel;