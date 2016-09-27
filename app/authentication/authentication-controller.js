const User = require("./user-model");
const bcrypt = require('bcrypt-nodejs');
const async = require('async');

exports.postLogin = function (req, res) {
  req.assert('username', 'Email is not valid').isEmail();
  req.assert('password', '6 to 20 characters required').len(6, 10);
  const errors = req.validationErrors(true);
  if (errors) {
    //req.flash('errors', errors);
    res.json({ status: 'error', errCode: 3000, msg: 'field validation errros', errInDetail: errors });
  }

  // async starts here
  var finalCallback = function (err, result) {
     console.log("err:::"+err);
     console.log("result:::"+result);
      if (err) {
        res.json({ status: 'error', errCode: 1010, msg: 'something went wrong, could not sigin' });
      }
      if (!result) {
        res.json({ status: 'info', errCode: 1011, msg: 'could not find the user' });
      }

      if (result) {
        res.json({ status: 'success', userObj: result });
      }
    };
  
  async.waterfall(
    [
      function (next) {

      User.findOne({ 'local.username': req.body.username }, function (err, userObj) {
        if (err) {
          finalCallback(err, null);
        }
        if (!userObj) {
          finalCallback(err, null);
        }
        else{
          next(null, userObj);
        }
      });
    },

    function (userObj, next) {
      console.log("userObj----userObj.local.password:::"+  userObj.local.password);
      console.log("input - .password:::"+  req.body.password);
      var validPassword = userObj.validPassword(req.body.password, userObj.local.password);
      console.log("validPassword:::"+validPassword);
      
      if (validPassword) {
        next(null, { status: 'success', userObj: userObj })
      }
      else {
        var noOfAttemptsWithWrongPwd = parseInt(userObj.local.noOfAttemptsWithWrongPwd);
        noOfAttemptsWithWrongPwd = noOfAttemptsWithWrongPwd >= 3  ? 3 : (noOfAttemptsWithWrongPwd+ 1);  

        User.findOneAndUpdate({ 'local.username': userObj.local.username },
          { $set: { 'local.noOfAttemptsWithWrongPwd': noOfAttemptsWithWrongPwd} },
          function (err, updatedUserObj) {
            if(err){
              next(err, null)
            }
            else{
              console.log("updatedUserObj:::"+updatedUserObj);
              next(null, { status: 'info', errCode: 1011, msg: 'Invalid password'/*, warning: { maxAttempt: 3, attempted: updatedUserObj.noOfAttemptsWithWrongPwd} */})
            }
          });
      }

    }],

    finalCallback
  );


}

exports.signUp = function (req, res) {
  req.assert('username', 'Email is not valid').isEmail();
  //req.assert('password', 'should have one lower case').isLowercase();
  //req.assert('password', 'should have one Upper case').isUppercase();
  req.assert('password', '6 to 20 characters required').len(6, 10);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
  //req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors(true);

  if (errors) {
    //req.flash('errors', errors);
    res.json({ status: 'error', errCode: 3000, msg: 'field validation errros', errInDetail: errors });
  }

  User.findOne({ 'local.username': req.body.username }, function (err, existingUser) {

    if (err) {
      res.json({ status: 'error', errCode: 1000, msg: 'something went wrong, could not signup with the new user', errInDetail: err });
    }
    if (existingUser) {
      res.json({ status: 'info', infoCode: 2000, msg: req.body.username + ' -  this email is already registered' });
    }
    else {
      const newUser = new User();
      newUser.local.username = req.body.username;
      newUser.local.password = req.body.password;

      newUser.save(function (err, newUser) {
        if (err) {
          res.json({ status: 'error', errCode: 1001, msg: 'something went wrong, could not signup with the new user', errInDetail: err });
        }
        if (newUser) {
          res.json({ status: 'success', msg: 'signup with the email' + req.body.username + 'is successfull', data: newUser });
        }
      });

    }
  });
}