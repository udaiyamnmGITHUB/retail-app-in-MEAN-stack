var express = require('express');
var mongoose = require('mongoose');
var Supplier = require('./suppliers-model');
var router = express.Router();

router.get('/getSupplierDetails',function(req,res){
    Supplier.find(function(err,suppliers){
        if(err){
            res.json('something went wrong with the database');

        }
        else{
            res.json(suppliers);
        }

    })
})
module.exports = router;