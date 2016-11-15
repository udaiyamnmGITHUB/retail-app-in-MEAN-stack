
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