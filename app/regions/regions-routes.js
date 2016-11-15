var express = require('express');
var mongoose = require('mongoose');
var Region = require('./regions-model');
var router = express.Router();

router.get('/getRegions',function(req,res){
    Region.find(function(err,regions){
        if(err){
            res.json('something went wrong with the database');

        }
        else{
            res.json(regions);
        }

    })
})
module.exports = router;