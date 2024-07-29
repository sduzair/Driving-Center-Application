const User = require("../models/User");
const Driver = require("../models/Driver");

module.exports = async function userSignup(req, res) {
	const userObj = {};
	userObj.username = req.body.username;
	userObj.password = req.body.password;
	userObj.userType = req.body.userType;

	switch (req.body.userType) {
		case "Driver": {
			const defaultDriver = new Driver();

			defaultDriver.firstName = "_defaultfirstname";
			defaultDriver.lastName = "_defaultlastname";
			defaultDriver.DOB = "_defaultdob";
			defaultDriver.address.houseNumber = 0;
			defaultDriver.address.street = "_defaultstreet";
			defaultDriver.address.city = "_defaultcity";
			defaultDriver.address.province = "_defaultinputProvince";
			defaultDriver.address.postalCode = "_defaultinputPostalCode";
			defaultDriver.carMake = "_defaultinputCarMake";
			defaultDriver.carModel = "_defaultinputCarModel";
			defaultDriver.carYear = 0;
			defaultDriver.carPlatNumber = 0;
			defaultDriver.carLicenceNumber = "_defaultinputCarLicenceNumber";
			defaultDriver.image1 = "/img/_default";
			defaultDriver.image2 = "/img/_default";

			// creating document in 'User' Collection
			User.create(userObj, (err, user) => {
				if (err != null) {
					const userError = Object.keys(err.errors).map(
						(key) => err.errors[key].message,
					);
					req.flash(
						"validationErrors",
						err.errors ? userError : ["Error creating user"],
					);
					req.flash("data", req.body);
					req.flash("inputFieldErrors", {
						username: userError[0],
					});
					res.redirect("/signup");
					return;
				}
				// creating document in 'Driver' collection
				defaultDriver.userID = user._id;
				Driver.create(defaultDriver, (err, driver) => {
					if (err) {
						const driverError = Object.keys(err.errors).map(
							(key) => err.errors[key].message,
						);
						req.flash(
							"validationErrors",
							err.errors ? driverError : ["Unable to create driver user"],
						);
						req.flash("data", req.body);
						req.flash("inputFieldErrors", {
							username: driverError[0],
						});
						res.redirect("/signup");
						return;
					}
					req.flash("serverMsgs", ["Signup successful."]);
					res.redirect("/login");
				});
			});
			break;
		}
		case "Admin":
			// creating document in 'User' Collection for user types other than 'Driver'
			User.create(userObj, (err, user) => {
				if (err) {
					const adminError = Object.keys(err.errors).map(
						(key) => err.errors[key].message,
					);
					req.flash(
						"validationErrors",
						err.errors ? adminError : ["Unable to create user"],
					);

					req.flash("data", req.body);
					req.flash("inputFieldErrors", {
						username: adminError[0],
					});
					res.redirect("/signup");
					return;
				}
				req.flash("serverMsgs", ["Signup successful."]);
				res.redirect("/login");
			});
			break;
		case "Examiner":
			// creating document in 'User' Collection for user types other than 'Driver'
			User.create(userObj, (err, user) => {
				if (err) {
					const examinerError = Object.keys(err.errors).map(
						(key) => err.errors[key].message,
					);
					req.flash(
						"validationErrors",
						err.errors ? examinerError : ["Unable to create user"],
					);
					req.flash("data", req.body);
					req.flash("inputFieldErrors", {
						username: examinerError[0],
					});
					res.redirect("/signup");
					return;
				}
				req.flash("serverMsgs", ["Signup for 'Examiner' successful."]);
				res.redirect("/login");
			});
			break;
	}
};
