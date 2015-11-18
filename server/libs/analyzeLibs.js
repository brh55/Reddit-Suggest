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
		// Factors that influence popularity -- though may not be true
		postData: {
			commentsCount: '',
			score: '',
			time: '',
			upvotes: '',
			weekDay: ''
		},
		weekday: {
			Sunday: {
				scores: [],
				avgScore: [],
			},
			Monday: {
				scores: [],
				avgScore: [],
			},
			Tuesday: {
				scores: [],
				avgScore: [],
			},
			Wednesday: {
				scores: [],
				avgScore: [],
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
		 * Builds a data set
		 * @param  {[object]} postData [post data to be parsed]
		 * @return {[arra]}         [formatted data set]
		 */
		buildPostDataSet: function (posts) {
			for (var i = 0; i < posts.length; i++) {
				// Extend object of typical Post
				var sampleObj = nodeUtil._extend({}, model.postData);

				sampleObj.score = posts[i].data.score;
				sampleObj.time = utils.getTime(posts[i].data.created_utc);
				sampleObj.commentsCount = posts[i].data.num_comments;
				sampleObj.upvotes = posts[i].data.ups;
				sampleObj.weekday = utils.getWeekDay(posts[i].data.created_utc);

				var dataSet = [sampleObj.score, sampleObj.commentsCount, sampleObj.weekday];

				// Store best score
				if (model.bestScore < sampleObj.score) {
					model.bestScore = sampleObj.score;
				}

				// Store most overall comments
				if (model.mostComments < sampleObj.commentsCount) {
					model.mostComments = sampleObj.commentsCount;
				}

				// model.postList.push(dataSet);
				// model.postDataSet.push(sampleObj);
				model.weekday[sampleObj.weekday].scores.push(sampleObj.score);
			}
		},
		/**
		 * Uses a random forest to return a day
		 * @param  {[type]} datam [description]
		 * @return {[type]}       [description]
		 */
		suggestWithForest: function (reqBody) {
			action.buildPostDataSet(reqBody.data.children);

			// TODO: Will like to get back to this if I have time.
			// Goal would be to iterate through with a instance set containing different days and MostComments and Score. Then suggest the day with greatest probability based on model.

			// if (model.postList.length > 0) {
			// 	var forest = new forestjs.RandomForest();

			// 	var options = {}

			// 	options.numTrees = 100;
			// 	options.maxDepth = 5;
			// 	options.numTries = 10;

				// TODO: COME BACK TO And figure out why it's not working.
				// options.trainFun = function(data, labels, ix, options) {
				// 	// save parameters that describe your model
				// 	model.parameter1 = 40;
				// 	model.parameter2 = 10;
				// 	return model;
				// };

				// options.testFun = function(inst, model) {
				// 	console.log(a);
				// 	// use model.parameter1 and model.parameter2 to return a 1 or -1 for
				// 	// example instance inst. This determines if it will be passed down
				// 	// left or right in the tree.

				// 	return inst[0] > model.parameter1 ? 1 : -1; // silly example
				// };

				// forest.train(model.postList, ["score", "commentsCount", "weekDay"], options);

				// var predictionList = [];

				// for (var days = 0; days <= 7; days++) {
				// 	predictionList.push([model.bestScore, model.mostComments]);
				// }

				// var testInstance = [10000];
				// var labelProbability = forest.predict(predictionList);

				// console.log(labelProbability);
			//}
		}
	};

	return {
		suggestWithForest: action.suggestWithForest,
		getAvgPerDay: action.getAvgPerDay
	};
})();
