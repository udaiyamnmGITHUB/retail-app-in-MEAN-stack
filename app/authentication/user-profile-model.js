const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
        profileId : {type: String , ref: 'user' },
        firstName : {type : String, required:true},
        lastName : {type: String, required:true},
        profilePic : {type: String, required:true},
        dob : {type:Date, required: true},
        gender:{type: String, enum: ['Male', 'Female']},
        address : {type: String}
    });


module.exports = mongoose.model('userProfile', userProfileSchema);