/*
    Main/Analytics Controller
    - Serves as a main feature of the app
 */

angular.module('redditApp.suggest', ['chart.js', 'Reddit', 'angularSpinner'])

.controller('suggestCtrl', function (RedditService, $scope) {
    var m = this.model = {
        subreddit: '',
        prevSearch: '',
        errorState: false,
        loading: false,
        dayAverages: {
            data: [],
            labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        },
        timeAverages: {
            data: [],
            labels: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
        },
        series: [],
        chartReady: false,
        bestPost: [],
        suggestDay: ''
    };

    var a = this.action = {
        /**
         * Creates a GET request to API
         * @return {[object]} [returns a JSON containing the weekly averages]
         */
        submitSearch: function () {
            m.loading = true;
            m.prevSearch = m.subreddit;

            RedditService.getStats(m.subreddit)
                .success(function (res) {
                    // Update the model to push data into data set
                    m.dayAverages.data.push(a.getAvgSet(res.averages.weekday));
                    m.timeAverages.data.push(a.getAvgSet(res.averages.time));
                    m.series.push(m.subreddit);
                    m.bestPost = res.bestPost;
                    m.suggestDay = res.suggestDay;

                    // Update States
                    m.loading = false;
                    m.chartReady = true;
                })
                .catch(function (err) {
                    m.errorState = true;
                })
                .finally(function () {
                    m.loading = false;
                });
        },
        /**
         * Updates average score model for charts
         * @param  {[object]} data [weekday averages dataset]
         * @return {[void]}      [updates the models series and data.]
         */
        getAvgSet: function (data) {
            var keys = Object.keys(data);
            var len = keys.length;
            // Chart.js takes nested array
            var dataSet = [];

            for (var i = 0; i < len; i++) {
                dataSet.push(data[keys[i]].avgScore);
            }

            return dataSet;
        },
        /**
         * Sets error false to dismiss any error messages
         * @return {[void]}
         */
        setErrorFalse: function () {
            m.errorState = false;
        }
    };

    // Listen for beginning new search
    $scope.$watch(function () {
        return m.subreddit;
    }, function (newValue, oldValue) {
        m.errorState = false;
    });
});
