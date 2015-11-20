/*
	Reddit Service
 */

var app = angular.module('Reddit', []);

app.factory('RedditService', ['$http', function ($http) {
	var action = {
        /**
         * Gets the Averages per Weekday
         * @param  {[string]} subreddit [the subreddit]
         * @return {[object]}           [JSON response]
         */
		getAvg: function(subreddit) {
			return $http.get('/api/stats/avg/' + subreddit);
		},
        /**
         * Get All Stats Regarding Subreddit
         * @param  {[string]} subreddit [the subreddit]
         * @return {[object]}           [JSON response]
         */
        getStats: function(subreddit) {
            return $http.get('/api/stats/' + subreddit);
        }
	};

	return {
		getAvg: action.getAvg,
        getStats: action.getStats
	};
}]);
