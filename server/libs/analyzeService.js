'use strict';

var nodeUtil = require('util');
var utils = require('./utils');
var request = require('request');
var statsSchema = require('../model/statsModel');

module.exports = (function () {
    var model = statsSchema;

    var action = {
        /**
         * Calculates the average of all days and updates the model
         */
        calcAvg: function () {
            // Receive array of keys and loop through
            Object.keys(model.averages.weekday).forEach(function (key) {
                var day = model.averages.weekday[key];

                // if the day contains scores
                // calculate mean/average
                if (day.scores.length > 0) {
                    var total = 0;
                    var len = day.scores.length;

                    for (var i = 0; i < len; i++) {
                        total += day.scores[i];
                    }

                    day.avgScore = Math.round(total / len);
                }
            });
        },
        // TODO: Condense to reusable function
        timeAvgs: function () {
            Object.keys(model.averages.time).forEach(function (key) {
                var time = model.averages.time[key];

                if (time.scores.length > 0) {
                    var total = 0;
                    var len = time.scores.length;

                    for (var i = 0; i < len; i++) {
                        total += time.scores[i];
                    }

                    time.avgScore = Math.round(total / len);
                }
            });
        },
        /**
         * Builds a data set
         * @param  {[object]} postData [post data to be parsed]
         * @return {[array]}         [formatted data set]
         */
        buildPostDataSet: function (posts) {
            var postSchema = {
                commentCount: '',
                score: '',
                time: '',
                upvotes: '',
                weekday: '',
                title: '',
                url: ''
            };

            // Refactor for speed improvements
            for (var i = 0; i < posts.length; i++) {
                var postObj = nodeUtil._extend({}, postSchema);

                postObj.score = posts[i].data.score;
                postObj.hour = utils.roundTime(posts[i].data.created_utc);
                postObj.commentCount = posts[i].data.num_comments;
                postObj.upvotes = posts[i].data.ups;
                postObj.weekday = utils.getWeekDay(posts[i].data.created_utc);
                postObj.url = posts[i].data.url;
                postObj.title = posts[i].data.title;

                // Update best score and weekday as well
                if (model.bestScore < postObj.score) {
                    model.bestScore = postObj.score;
                    model.bestPost.push(postObj);
                }

                // Update most overall comments
                model.mostComments = (model.mostComments < postObj.commentCount) ? postObj.commentCount : model.mostComments;

                model.postDataSet.push(postObj);
                model.averages.weekday[postObj.weekday].scores.push(postObj.score);
                model.averages.time[postObj.hour].scores.push(postObj.score);
            }
        },
        /**
         * Gets averages per day of Reddit posts
         * @param  {[string]} subreddit [subreddit in question]
         * @param  {[number]} limit     [number of post to calculate base on, max 100]
         * @param  {[string]} t         [month, day, week]
         * @param  {[function]} callback [a callback to be performed]
         * @return {[object]}           [returns the weekdays scores, and averages]
         */
        getAvgPerDay: function (subreddit, limit, t, callback) {
            request({
                url: 'https://www.reddit.com/r/' + subreddit + '/top.json',
                qs: {
                    limit: limit || 100,
                    t: t
                },
                method: 'GET'
            }, function (err, res, body) {
                if (err) throw err;

                if (!err && res.statusCode === 200) {

                    var posts = JSON.parse(body);

                    action.buildPostDataSet(posts.data.children);
                    action.calcAvg();
                    action.timeAvgs();

                    return callback(model.averages);
                }
            });
        },
        /**
         * Wrapper function to return entire model
         */
        getStats: function (subreddit, limit, t, callback) {
            request({
                url: 'https://www.reddit.com/r/' + subreddit + '/top.json',
                qs: {
                    limit: limit || 100,
                    t: t
                },
                method: 'GET'
            }, function (err, res, body) {
                if (err) throw err;

                if (!err && res.statusCode === 200) {
                    var posts = JSON.parse(body);

                    action.buildPostDataSet(posts.data.children);
                    action.calcAvg();
                    action.timeAvgs();

                    return callback(model);
                }
            });
        },
    };

    return {
        getAvgPerDay: action.getAvgPerDay,
        getStats: action.getStats
    };
})();
