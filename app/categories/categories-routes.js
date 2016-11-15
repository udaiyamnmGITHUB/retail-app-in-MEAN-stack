var express = require('express');
var mongoose = require('mongoose');
var categories= require('./categories-model');
var router = express.Router();

router.get('/getcategories',function(req,res){
    categories.find(function(err,categories){
        if(err){
            res.json('something went wrong with the database');

        }
        else{
            res.json(categories);
        }

    })
})
module.exports = router;
