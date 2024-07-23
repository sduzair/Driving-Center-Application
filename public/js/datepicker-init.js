// datepicker setup requires input element with server time as value
const minDateText = document.getElementById("serverTime").textContent;
const calMinDate = new Date(minDateText).setHours(0, 0, 0, 0);
const picker = new tempusDominus.TempusDominus(
	document.getElementById("inlinePicker"),
	{
		display: {
			inline: true,
			components: {
				decades: true,
				year: true,
				month: true,
				date: true,
				hours: false,
				minutes: false,
				seconds: false,
			},
		},
		stepping: 30,
		restrictions: {
			daysOfWeekDisabled: [0, 6],
			minDate: new Date(calMinDate),
		},
		promptTimeOnDateChange: true,
	},
);
