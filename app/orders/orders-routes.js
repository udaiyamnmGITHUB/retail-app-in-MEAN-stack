var express = require('express');
var mongoose = require('mongoose');
var Order = require('./orders-model');
var router = express.Router();

router.get('/getOrder',function(req,res){
    Order.find(function(err,orders){
        if(err){
            res.json('something went wrong with the database');

        }
        else{
            res.json(orders);
        }

    })
})
module.exports = router;