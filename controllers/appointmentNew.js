const Appointment = require("../models/Appointment");

module.exports = (req, res) => {
	const { appointmentTime, appointmentDate } = req.body;

	Appointment.create(
		{
			appointmentTime: appointmentTime,
			appointmentDate: appointmentDate,
		},
		(err) => {
			if (!err) {
				req.flash("serverMsgs", ["Appointment created successfully."]);
				res.redirect("/admins/appointment-page");
			} else {
				req.flash(
					"validationErrors",
					err.errors
						? Object.keys(err.errors).map((key) => err.errors[key].message)
						: ["Unable to create appointment"],
				);
				req.flash("data", req.body);
				res.redirect("/admins/appointment-page");
			}
		},
	);
};
