const Driver = require("../models/Driver");
module.exports = (req, res) => {
	//appointment not null and testResult not declared
	Driver.find(
		{ appointmentID: { $ne: null }, testResult: { $ne: null } },
		"-carModel -carYear -DOB -userID -address",
	)
		.populate("appointmentID", { match: { isTimeSlotAvailable: false } })
		.exec((error, driversObj) => {
			if (error || !driversObj || driversObj.length === 0) {
				res.render("admin/test-results", {
					errors: ["error retrieving driver test-results"],
					serverMsgs: ["No test results found"],
					driversObj: null,
				});
			} else {
				// res.status( 404 ).json( driversObj )
				res.render("admin/test-results", {
					errors: null,
					serverMsgs: null,
					driversObj: driversObj,
				});
			}
		});
};
