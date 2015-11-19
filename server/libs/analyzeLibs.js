'use strict';

var forestjs = require('forestjs');
var RandomForestClassifier = require('random-forest-classifier')
								.RandomForestClassifier;
var nodeUtil = require('util');
var utils = require('./utils');

module.exports = (function() {
	var model = {
		postDataSet: [],
		postList: [],
		weekday: {
			Sunday: {
				scores: [],
				avgScore: [],
				avgComment: [],
			},
			Monday: {
				scores: [],
				avgScore: [],
				avgComment: [],
			},
			Tuesday: {
				scores: [],
				avgScore: [],
				avgComment: [],
			},
			Wednesday: {
				scores: [],
				avgScore: [],
				avgComment: [],
			},
			Thursday: {
				scores: [],
				avgScore: [],
			},
			Friday: {
				scores: [],
				avgScore: [],
			},
			Saturday: {
				scores: [],
				avgScore: [],
			},
		},
		topTitles: [],
		bestScore: '',
		mostComments: '',
		suggestPost: {
			day: ''
		}
	};


	var action = {
		/**
		 * Calculates the average of all days and updates the model
		 */
		calcAvg: function () {
			// Receive array of keys and loop through
			Object.keys(model.weekday).forEach(function(key) {
				var day = model.weekday[key]

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
		timeAvgs: function () {
			Object.keys(model.weekday).forEach(function(key) {
				var day = model.weekday[key]

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
		/**
		 * Builds a data set
		 * @param  {[object]} postData [post data to be parsed]
		 * @return {[array]}         [formatted data set]
		 */
		buildPostDataSet: function (posts) {
			var postObj = {
				commentsCount: '',
				score: '',
				time: '',
				upvotes: '',
				weekDay: ''
			};

			for (var i = 0; i < posts.length; i++) {

				postObj.score = posts[i].data.score;
				postObj.nearestTime = utils.roundTime(posts[i].data.created_utc);
				postObj.commentsCount = posts[i].data.num_comments;
				postObj.upvotes = posts[i].data.ups;
				postObj.weekday = utils.getWeekDay(posts[i].data.created_utc);


				var dataSet = [postObj.score, postObj.commentsCount, postObj.weekday];

				// Store best score
				model.bestScore = (model.bestScore < postObj.score) ? postObj.score : model.bestScore;

				// Store most overall comments
				model.mostComments = (model.mostComments < postObj.commentsCount) ? postObj.commentsCount: model.mostComments;

				model.postList.push(dataSet);
				model.postDataSet.push(postObj);
				model.weekday[postObj.weekday].scores.push(postObj.score);
			}
		},
		// *
		//  * Uses a random forest to return a day
		//  * @param  {[type]} data [description]
		//  * @return {[type]}       [description]
		 
		// suggestWithForest: function (reqBody) {
			// Placeholder for later: https://gist.github.com/brh55/66a22ed02fdc3b80bf33 if have time.
		// },
		/**
		 * Wrapper function to return Avg score of the week day scores
		 * @return {[object]} [weekday scores and Avg]
		 */
		getAvgPerDay: function (posts) {
			action.buildPostDataSet(posts);
			action.calcAvg();
			return model.weekday;
		},
		/**
		 * Wrapper function to return entire model
		 * @return {[object]} [weekday scores and Avg]
		 */
		getStats: function (posts) {
			action.buildPostDataSet(posts);
			action.calcAvg();
			return model;
		}
	};

	return {
		getAvgPerDay: action.getAvgPerDay,
		getStats: action.getStats
	};
})();
