/*
    Main/Analytics Controller
    - Serves as a main feature of the app
 */

angular.module('redditApp.suggest', ['chart.js', 'Reddit', 'ngAnimate'])

.controller('suggestCtrl', function(RedditService, $scope) {
    var m = this.model = {
        subreddit: '',
        prevSearch: '',
        errorState: false,
        loading: false,
        averages: {
            series: [],
            data: [],
            labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        },
        chartReady: false
    };

    var a = this.action = {
        submitSearch: function () {
            m.loading = true;
            m.prevSearch = m.subreddit;

            RedditService.getSuggest(m.subreddit)
                .success(function(res) {
                    // Update the model to push data into data set
                    a.updateAvgSet(res);
                    m.loading = false;
                })
                .catch(function(err) {
                    m.errorState = true;
                })
                .finally(function () {
                    m.loading = false;
                });
        },
        updateAvgSet: function (data) {
            var keys = Object.keys(data);
            var len = keys.length;
            // Chart.js takes nested array
            var dataSet = [];

            for (var i = 0; i < len; i++) {
                dataSet.push(data[keys[i]].avgScore);
            }

            m.averages.series.push(m.subreddit);
            m.averages.data.push(dataSet);
            m.chartReady = true;
        }
    };

    // Listen for beginning new search
    $scope.$watch(function() {
        return m.subreddit;
    }, function(newValue, oldValue) {
        m.errorState = false;
    });
});
