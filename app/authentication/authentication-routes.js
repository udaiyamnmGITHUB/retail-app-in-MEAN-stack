const express = require("express");
const router = express.Router();
const authController = require("./authentication-controller");

router.get('/login', function (req, res) {
    res.send('login is ready');
});

router.post('/login', authController.postLogin);
// define the about route
router.post('/signup', authController.signUp);

module.exports = router;