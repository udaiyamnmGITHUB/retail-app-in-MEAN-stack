// const express = require("express");
// const router = express.Router();

// router.get('/', function (req, res) {
//     res.send('Employee home page is ready');
// });

// router.get('/addEmployee', function(req, res) {
//   res.send('addEmployee');
// });
// // define the about route
// router.post('/getEmployeeList', function(req, res) {
//   res.send('getEmployeeList');
// });

// module.exports = router;
var express = require('express');
var mongoose = require('mongoose');
var employees= require('./employees-model');
var router = express.Router();

router.get('/getemployees',function(req,res){
    employees.find(function(err,employees){
        if(err){
            res.json('something went wrong with the database');

        }
        else{
            res.json(employees);
        }

    })
})
module.exports = router;