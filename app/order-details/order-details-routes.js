var express = require('express');
var mongoose = require('mongoose');
var orderDetails = require('./order-details-model');
var orderDetailsMapRedCommand = require('./order-details-subTotal-map-red')
var router = express.Router();

router.get('/getSubTotalFromOrderDetails',function(req,res){

    orderDetails.mapReduce(orderDetailsMapRedCommand, function(err, result){

    if(err){
                res.json('something went wrong with the database');

            }
            else{
                res.json(result);
            }
        });   
});
module.exports = router;