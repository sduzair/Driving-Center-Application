const Appointment = require("../models/Appointment");

module.exports = (req, res) => {
	const { month, day, year } = req.params;
	const forDate = `${month}/${day}/${year}`;

	Appointment.find({ appointmentDate: forDate }, (err, appointment) => {
		if (!err) {
			res.status(200).send({
				appointment,
			});
		} else {
			res.status(404).send("File not found");
		}
	});
};
