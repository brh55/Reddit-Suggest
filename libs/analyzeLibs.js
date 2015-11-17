'use strict';

var forestjs = require('forestjs');
var RandomForestClassifier = require('random-forest-classifier')
								.RandomForestClassifier;
var nodeUtil = require('util');
var utils = require('./utils');

module.exports = (function() {
	var model = {
		postList: [],
		// Factors that influence popularity -- though may not be true
		postData: {
			commentsCount: '',
			score: '',
			time: '',
			upvotes: '',
			weekDay: ''
		}
	};


	var action = {
		/**
		 * Builds a data set to use for training random forest
		 * @param  {[object]} postData [post data to be parsed]
		 * @return {[type]}         [formatted data set]
		 */
		buildPostDataSet: function (posts) {
			for (var i = 0; i < posts.length; i++) {
				// var sampleObj = nodeUtil._extend({}, model.postData);

				var score = posts[i].data.score;
				// var time = utils.getTime(posts[i].data.created_utc);
				var commentsCount = posts[i].data.num_comments;
				var upvotes = posts[i].data.ups;
				var weekDay = utils.getWeekDay(posts[i].data.created_utc);

				var dataSet = [score, commentsCount, upvotes, weekDay];
				model.postList.push(dataSet);
			}
		},
		/**
		 * [suggestWithForest description]
		 * @param  {[type]} datam [description]
		 * @return {[type]}       [description]
		 */
		suggestWithForest: function (reqBody) {
			action.buildPostDataSet(reqBody.data.children);

			if (model.postList.length > 0) {
				var forest = new forestjs.RandomForest();

				var options = {}

				options.numTrees = 100;
				options.maxDepth = 5;
				options.numTries = 10;

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

				forest.train(model.postList, ["score", "commentsCount", "upvotes", "weekDay"], options);
				var testInstance = [10000];
				var labelProbability = forest.predictOne(testInstance);

				console.log(labelProbability);
			}
		}
	};

	return {
		suggestWithForest: action.suggestWithForest
	};
})();
