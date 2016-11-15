const LocalStrategy = require('passport-local').Strategy;
const async = require('async');
const flash = require('express-flash');
const User = require("../authentication/user-model");

/**
* Sign in using Email and Password.
*/
module.exports = function (passport) {

    passport.use('local-sign-up', new LocalStrategy({ usernameField: 'username' , passwordField : 'password'}, 
         // allows us to pass back the entire request to the callback
        function (username, password, done) {

            User.findOne({ 'local.username': username }, function (err, existingUser) {

                if (err) {
                done({ status: 'error', errCode: 1000, msg: 'something went wrong, could not signup with the new user', errInDetail: err });
                }
                if (existingUser) {
                done({ status: 'info', infoCode: 2000, msg: username + ' -  this email is already registered' });
                }
                else {
                const newUser = new User();
                newUser.local.username = username;
                newUser.local.password = password;

                newUser.save(function (err, newUser) {
                    if (err) {
                    done({ status: 'error', errCode: 1001, msg: 'something went wrong, could not signup with the new user', errInDetail: err });
                    }
                    if (newUser) {
                    done({ status: 'success', msg: 'signup with the email' + username + 'is successfull', data: newUser });
                    }
                });

                }
        });

    }));
}
