const LocalStrategy = require('passport-local').Strategy;
const async = require('async');
const flash = require('express-flash');
const User = require("../authentication/user-model");

/**
* Sign in using Email and Password.
*/
module.exports = function (passport) {
    passport.use('local-sign-in', new LocalStrategy({ usernameField: 'username' }, function (username, password, done) {

        var finalCallback = function (err, result) {
            if (err) {
                done({ status: 'error', errCode: 1010, msg: 'something went wrong, could not sigin' }, null, null);
            }
            if (!result) {
                done(null, null, { status: 'info', errCode: 1011, msg: 'could not find the user' });
            }

            if (result) {
                done(null, { status: 'success', userObj: result }, null);
            }
        };

        async.waterfall(
            [
                function (next) {

                    User.findOne({ 'local.username': username }, function (err, userObj) {
                        if (err) {
                            finalCallback(err, null);
                        }
                        if (!userObj) {
                            finalCallback(err, null);
                        }
                        else {
                            next(null, userObj);
                        }
                    });
                },

                function (userObj, next) {

                    var validPassword = userObj.validPassword(password, userObj.local.password);

                    if (validPassword) {
                        next(null, { status: 'success', userObj: userObj })
                    }
                    else {
                        var noOfAttemptsWithWrongPwd = parseInt(userObj.local.noOfAttemptsWithWrongPwd);
                        noOfAttemptsWithWrongPwd = noOfAttemptsWithWrongPwd >= 3 ? 3 : (noOfAttemptsWithWrongPwd + 1);

                        User.findOneAndUpdate({ 'local.username': userObj.local.username },
                            { $set: { 'local.noOfAttemptsWithWrongPwd': noOfAttemptsWithWrongPwd } },
                            function (err, updatedUserObj) {
                                if (err) {
                                    next(err, null)
                                }
                                else {
                                    next(null, { status: 'info', errCode: 1011, msg: 'Invalid password'/*, warning: { maxAttempt: 3, attempted: updatedUserObj.noOfAttemptsWithWrongPwd} */ })
                                }
                            });
                    }

                }],

            finalCallback
        );
    }));
}
