'use strict';

/*
    Reddit Service Lib
 */

var request = require('request');

module.exports = (function() {
    var action = {
        /**
         * Returns the list of Post associated with a subreddit
         * @param  {[type]} subreddit [the subreddit to fetch of]
         * @param  {[type]} limit     [limit returning post]
         * @param  {[type]} t         [type of Week, Day, Month, Year, All]
         * @return {[type]}           [JSON of post assoiated with Subreddit]
         */
        getPost: function (subreddit, limit, t) {
            request({
                url: 'https://www.reddit.com/r/' + subreddit + '.json',
                qs: {
                    limit: limit || 100,
                    t: t
                },
                method: 'GET'
            }, function(err, res, body) {
                if (err) {
                    console.log(err);
                }

                if (!err && res.statusCode == 200) {
                    suggestedRes = body;
                }
            });

            res.json(body);
        }
    }

    return {
        getPost: action.getPost
    };
})();
