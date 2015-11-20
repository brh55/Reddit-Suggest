'use strict';

var express          = require('express');
var request          = require('request');
var statsRoute       = express.Router();
var config           = require('../libs/config');
var analyzeService   = require('../libs/analyzeService');


statsRoute.get('/avg/:subreddit', function (req, res) {
    var subreddit = req.params.subreddit;

    analyzeService.getAvgPerDay(subreddit, 100, "month", function(data) {
        res.send(data);
    });
});


// Investigate how to modularize this to apply DRY
statsRoute.get('/:subreddit', function (req, res) {
    var subreddit = req.params.subreddit;

    analyzeService.getStats(subreddit, 100, "month", function(data) {
        res.send(data);
    });
});

module.exports = statsRoute;
