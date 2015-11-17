'use strict';

module.exports = (function () {
	var action = {
		/**
		 * Convert Epoch to Date
		 * @param  {[number]} epochDate [date format of epoch date]
		 * @return {[type]}           [description]
		 */
		convertEpoch: function (epochDate) {
			var d = new Date(epochDate * 1000);

			return d;
		},
		/**
		 * Return week Day from Epoch formatted Date
		 * @param  {[number]} epochDate [date format of epoch date]
		 * @return {[string]} [string of weekday]
		 */
		getWeekDay: function (epochDate) {
			var d = action.convertEpoch(epochDate);
			var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

			var theDay = weekDays[d.getDay()];
			return theDay;
		},
		/**
		 * Return string of UTC Time
		 * @param  {[number]} epochDate [date format of epoch date]
		 * @return {[string]}           [time]
		 */
		getTime: function (epochDate) {
			var d = action.convertEpoch(epochDate);

			var stringDate = d.toString();
			var time = stringDate.substring(16, 21);

			return time;
		}
	};

	return {
		convertEpoch: action.convertEpoch,
		getWeekDay: action.getWeekDay,
		getTime: action.getTime
	};
})();
