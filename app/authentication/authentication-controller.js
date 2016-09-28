const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');

exports.postLogin = function (req, res, next) {
  
  req.assert('username', 'Email is not valid').isEmail();
  req.assert('password', '6 to 20 characters required').len(6, 10);
  const errors = req.validationErrors(true);
  if (errors) {
    //req.flash('errors', errors);
    res.json({ status: 'error', errCode: 3000, msg: 'field validation errros', errInDetail: errors });
  }

   passport.authenticate('local-sign-in', function(err, user, info) {
    if (err) { 
      return res.json(err);
    }
    if (!user) {
      //req.flash('errors', info);
      return res.json(info);
    }
    if(user){
      req.logIn(user, (err) => {
      if (err) { return next(err); }
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.json(user);
    });

    }
    
  })(req, res, next);
}

exports.signUp = function (req, res, next) {
 
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

  passport.authenticate('local-sign-up', function(err, user, info) {
    if (err) { 
      return res.json(err);
    }
    if (!user) {
      //req.flash('errors', info);
      return res.json(info);
    }
    if(user){
      req.logIn(user, (err) => {
      if (err) { return next(err); }
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.json(user);
    });

    }
    
  })(req, res, next);
}