const Driver = require("../models/Driver");
const Appointment = require("../models/Appointment");

// has middleware to check not null for req.body

module.exports = async (req, res) => {
	const { appointmentTime, appointmentDate, appointmentType } = req.body;

	const isReturn = await new Promise((resolve, reject) => {
		if (!appointmentTime) {
			req.flash("validationErrors", ["Select appointment time"]);
			res.redirect(`/drivers/${appointmentType.toLowerCase()}-page`);
			resolve(true);
		}
		resolve(false);
	});
	if (isReturn) return;

	Appointment.findOneAndUpdate(
		{ appointmentDate, appointmentTime, isTimeSlotAvailable: true },
		{ isTimeSlotAvailable: false },
		(err, appointment) => {
			if (!err && appointment) {
				Driver.findOneAndUpdate(
					{ userID: req.session.userId },
					{ appointmentID: appointment._id, appointmentType },
					(err, driver) => {
						if (!err && driver) {
							req.flash("serverMsgs", [
								`Appointment booked for ${appointmentDate} - ${appointmentTime}`,
							]);
							res.redirect(`/drivers/${appointmentType.toLowerCase()}-page`);
						} else if (err) {
							req.flash(
								"validationErrors",
								err.errors
									? Object.keys(err.errors).map(
											(key) => err.errors[key].message,
										)
									: ["Unable to book appointment"],
							);
							res.redirect(`/drivers/${appointmentType.toLowerCase()}-page`);
						} else if (!driver) {
							req.flash("serverMsgs", ["Driver not found"]);
							res.redirect(`/drivers/${appointmentType.toLowerCase()}-page`);
						}
					},
				);
			} else if (err) {
				req.flash(
					"validationErrors",
					err.errors
						? Object.keys(err.errors).map((key) => err.errors[key].message)
						: ["Unable to retreive appointment slots"],
				);
				res.redirect(`/drivers/${appointmentType.toLowerCase()}-page`);
			} else if (!appointment) {
				req.flash("serverMsgs", [
					"Appointment slot already taken or does not exist",
				]);
				res.redirect(`/drivers/${appointmentType.toLowerCase()}-page`);
			}
		},
	);
};
