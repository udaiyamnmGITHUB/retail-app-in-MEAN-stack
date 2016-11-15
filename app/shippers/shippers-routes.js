var express = require('express');
var mongoose = require('mongoose');
var Shipper = require('./shippers-model');
var router = express.Router();

router.get('/getShipperDetails',function(req,res){
    Shipper.find(function(err,shippers){
        if(err){
            res.json('something went wrong with the database');

        }
        else{
            res.json(shippers);
        }

    })
})
module.exports = router;