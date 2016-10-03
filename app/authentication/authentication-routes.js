const express = require("express");
const router = express.Router();
const authController = require("./authentication-controller");

router.post('/login', authController.postLogin);

router.post('/signup', authController.signUp);

router.get('/getUserProfile', authController.getUserProfile);

router.post('/postUserProfile', authController.postUserProfile);

module.exports = router;