'use strict';

var express       = require('express');
var request       = require('request');
var suggestRoute  = express.Router();
var config        = require('../libs/config');
var redditService = require('../libs/redditService');
var analyzeLibs   = require('../libs/analyzeLibs');

suggestRoute.get('/:subreddit', function (req, res) {
    var subreddit = req.params.subreddit;

    request({
        url: 'https://www.reddit.com/r/' + subreddit + '/top.json',
        qs: {
            limit: 100,
            t: "month"
        },
        method: 'GET'
    }, function(err, response, body) {
        if (err) {
            console.log(err);
        }

        if (!err && res.statusCode == 200) {
      		var bodyJSON = JSON.parse(body);
      		var meanResp = analyzeLibs.getAvgPerDay(bodyJSON.data.children);

      		res.json(meanResp);
        }
    });
});

module.exports = suggestRoute;
