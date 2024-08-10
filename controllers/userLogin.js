// at the current stage only users of user type 'Driver' are able to login and access the driver dashboard
const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = function userLogin(req, res) {
	const { password, username } = req.body;
	User.findOne({ username: username }, (error, user) => {
		if (error) {
			req.flash(
				"validationErrors",
				error.errors
					? Object.keys(error.errors).map((key) => error.errors[key].message)
					: ["Unable to login"],
			);
			res.redirect("/login");
			return;
		}
		if (!user) {
			req.flash("validationErrors", ["Signup first to login"]);
			res.redirect("/signup");
			return;
		}
		bcrypt.compare(password, user.password, (error, same) => {
			if (error) {
				req.flash("validationErrors", ["Unable to check password"]);
				res.redirect("/login");
				return;
			}
			if (!same) {
				req.flash("validationErrors", ["Incorrect username/password"]);
				res.redirect("/login");
				return;
			}
			// store user session
			// now each time user makes a request this cookie is sent to server with authentication id
			req.session.userId = user._id;
			req.session.userType = user.userType;

			switch (user.userType) {
				case "Driver":
					req.flash("serverMsgs", ["Welcome to the driver dashboard"]);
					res.redirect("/drivers/dashboard-page");
					break;
				case "Examiner":
					req.flash("serverMsgs", ["Welcome to the examiner dashboard"]);
					res.redirect("/examiners/dashboard");
					break;
				case "Admin":
					req.flash("serverMsgs", ["Welcome to the admin dashboard"]);
					res.redirect("/admins/dashboard-page");
					break;
				default: {
					const error = new Error(
						"The server encountered an unexpected condition due to corrupted role definitions. Expected roles are Driver, Examiner, or Admin.",
					);
					return next(error);
				}
			}
		});
	});
};
