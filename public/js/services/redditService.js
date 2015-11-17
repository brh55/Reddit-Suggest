/*
	Reddit Service
 */

var app = angular.module('RedditService', []);

app.factory('Reddit', ['$http', function ($http) {
	var action = {
		getSuggest: function(subreddit, time) {
			return $http.get('/api/suggest' + subreddit);
		}
	};

	return {
		getSuggest: action.getSuggest
	}
});
