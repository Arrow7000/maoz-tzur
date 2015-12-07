$(document).ready(function() {

	// Gets the location for the user's IP address
	$.getJSON('http://freegeoip.net/json/', function(loc) {

		// Gets the Hebcal data for user's location and time zone
		// $.getJSON('http://www.hebcal.com/hebcal/?v=1&cfg=json&year=now&month=12&c=on&geo=pos&latitude=' + loc.latitude + '&longitude=' + loc.longitude + '&tzid=' + 'UTC', function(cal) {


			$.getJSON('http://www.hebcal.com/hebcal/?v=1&cfg=json&year=now&month=12&c=on&geo=pos&latitude=' + 31.7833 + '&longitude=' + 35.2167 + '&tzid=' + 'UTC', function(cal) {


			// Gets today's date, and sets hours to zero
			var todayDate = new Date();
			todayDate.setHours(0, 0, 0, 0);

			// Loops through all days
			for (var i = 0; i < cal.items.length; i++) {

				// Today in Hebcal
				var day = new Date(cal.items[i].date);

				// Gets the Hebcal item's date
				var dayDate = new Date(day);
				dayDate.setHours(0, 0, 0, 0);

				// Compares today's date with Hebcal candle lighting day (need to make number first, hence + signs)
				if (+todayDate == +dayDate) {
					// console.log("Days match!");

					var timeString = day.getHours() - 12 + ":" + pad(day.getMinutes(), 2) + "pm";

					console.log("Lighting tonight is at " + timeString + ".");
				}


			}






		});
	});
});


// Pads number out into string with leading zeros as specified
function pad(num, size) {
	var s = "000000000" + num;
	return s.substr(s.length - size);
}
