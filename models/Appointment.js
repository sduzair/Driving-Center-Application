const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const AppointmentSchema = new mongoose.Schema(
	{
		appointmentTime: {
			required: [true, "Please provide appointment time"],
			type: String,
		},
		appointmentDate: {
			required: [true, "Please provide appointment date"],
			type: String,
		},
		duration: {
			default: "30min",
			type: String,
		},
		isTimeSlotAvailable: {
			default: true,
			type: Boolean,
		},
	},
	{ timestamps: true },
);

AppointmentSchema.index(
	{
		appointmentTime: 1,
		appointmentDate: 1,
	},
	{ unique: true },
);

AppointmentSchema.plugin(uniqueValidator, {
	message: "Appointment slot already exists",
});

AppointmentSchema.pre("create", function (next) {
	this.options.runValidators = true;
	next();
});

AppointmentSchema.pre("findOneAndUpdate", function (next) {
	this.options.runValidators = true;
	next();
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;
