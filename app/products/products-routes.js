var express = require('express');
var mongoose = require('mongoose');
var Product = require('./products-model');
var router = express.Router();

router.get('/getProduct',function(req,res){
    Product.find(function(err,products){
        if(err){
            res.json('something went wrong with the database');

        }
        else{
            res.json(products);
        }

    })
})
module.exports = router;