'use strict';

var express       = require('express');
var request       = require('request');
var suggestRoute  = express.Router();
var config        = require('../libs/config');
var redditService = require('../libs/redditService');
var analyzeLibs   = require('../libs/analyzeLibs');

suggestRoute.post('/:subreddit', function (req, res) {
	var subreddit = req.params.subreddit;
    var requestUrl = config.subreditt + "/top.json?limit=100&t=month";

    request({
        url: 'https://www.reddit.com/r/' + subreddit + '.json',
        qs: {
            limit: 100,
            t: "week"
        },
        method: 'GET'
    }, function(err, response, body) {
        if (err) {
            console.log(err);
        }

        if (!err && res.statusCode == 200) {
      		var bodyJSON = JSON.parse(body);
      		analyzeLibs.suggestWithForest(bodyJSON);

      		res.json();
        }
    });
});

module.exports = suggestRoute;
