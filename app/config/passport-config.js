const passport = require("passport");
const session = require("express-session");
const flash = require('express-flash');
const MongoStore = require('connect-mongo')(session);
var configAuth = require('./authentication-config');

module.exports = function (app) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET,
        store: new MongoStore({
            url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
            autoReconnect: true
        })
    }));

    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
    
    require("./passport-local-sign-in")(passport);
    require("./passport-local-sign-up")(passport);

    /**
 * Sign in using Email and Password.
 */
   /* passport.use(new LocalStrategy({ usernameField: 'username' }, function (username, password, done) {

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
                                    next(null, { status: 'info', errCode: 1011, msg: 'Invalid password'})
                                }
                            });
                    }

                }],

            finalCallback
        );
    }));*/
}


