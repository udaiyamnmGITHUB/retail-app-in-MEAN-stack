const mongoose = require("mongoose");
const bcrypt = require('bcrypt-nodejs'); 

const userSchema = new mongoose.Schema({
    local:{
        username : {type : String, required:true, unique:true, index:true, ref: 'userProfile'}, 
        password : {type: String, required:true},
        passwordExpiryInDate : {type:Date, default: Date.now()},
        isPasswordLocked: {type: Boolean, default: false},
        noOfAttemptsWithWrongPwd : {type: Number,  min: 0, max: 3, default:0}
    }

});

userSchema.methods.setExpiryDateForPwd = function() {
    var today  = new Date(); 
    var expiryDate  = today.setDate( parseInt(today.getDate()) + 30);
    expiryDate = new Date(expiryDate);
    return expiryDate;
};

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


userSchema.pre('save', function (next) {
  const user = this;
  user.local.password = user.generateHash(user.local.password);
  user.local.passwordExpiryInDate = user.setExpiryDateForPwd();
  next();
});



module.exports = mongoose.model('user', userSchema);;