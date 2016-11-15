var express = require('express');
var mongoose = require('mongoose');
var Territory = require('./territories-model');
var router = express.Router();

router.get('/getTerritoryDetails',function(req,res){
    Territory.find(function(err,territories){
        if(err){
            res.json('something went wrong with the database');

        }
        else{
            res.json(territories);
        }

    })
})
module.exports = router;