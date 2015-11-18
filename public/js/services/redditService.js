/*
	Reddit Service
 */

var app = angular.module('Reddit', []);

app.factory('RedditService', ['$http', function ($http) {
	var action = {
		getSuggest: function(subreddit) {
			return $http.get('/api/suggest/' + subreddit);
		}
	};

	return {
		getSuggest: action.getSuggest
	};
}]);
