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
router.get('/getProductList',function(req,res){
    Product.aggregate([

     {$lookup: {  from: "categories",
                  localField: "CategoryID",
                  foreignField: "CategoryID",
                  as :  "prodcut"
               }
     },
     {
     $project: {  "ProductID":1,
                  "ProductName":1,
                  "SupplierID":1,
                  "CategoryID":1,
                  "QuantityPerUnit":1,
                  "UnitPrice":1,
                  "Discontinued":1,
                  "_id":0   
               }
    },
    {
    $match:    {  "Discontinued":"0"
               }
    },
    {
    $sort:     {  "ProductName":1
               }
    }],function(err,results){
    if(err){
        res.send(err);
    }
    else{
        res.send(results);
    }
})
})
module.exports = router;