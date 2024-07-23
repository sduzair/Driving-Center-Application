const Driver = require("../models/Driver");

module.exports = (req, res) => {
	const { filterType } = req.params;
	Driver.find({
		appointmentType: filterType,
		appointmentID: { $ne: null },
		testResult: null,
	})
		.populate("appointmentID", { match: { isTimeSlotAvailable: false } })
		.exec((error, driversObj) => {
			if (error) {
				res.render("examiner/appointments", {
					errors: ["error retrieving driver appointments"],
					serverMsgs: null,
					driversObj: null,
					filteredBy: filterType,
				});
			} else if (!driversObj || driversObj.length === 0) {
				res.render("examiner/appointments", {
					errors: null,
					serverMsgs: ["No driver appointments"],
					driversObj: null,
					filteredBy: filterType,
				});
			} else {
				// res.status( 200 ).json( driversObj )
				res.render("examiner/appointments", {
					errors: null,
					serverMsgs: null,
					driversObj: driversObj,
					filteredBy: filterType,
				});
			}
		});
};
