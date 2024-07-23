const User = require("../models/User");
const Driver = require("../models/Driver");
const mongoose = require("mongoose");

module.exports = async function userSignup(req, res) {
	const userObj = {};
	userObj.username = req.body.username;
	userObj.password = req.body.password;
	userObj.userType = req.body.userType;

	if (req.body.userType === "Driver") {
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
			if (err == null) {
				// creating document in 'Driver' collection
				defaultDriver.userID = user._id;
				Driver.create(defaultDriver, (err, driver) => {
					if (!err) {
						req.flash("serverMsgs", ["Signup successful."]);
						res.redirect("/login");
					} else {
						req.flash(
							"validationErrors",
							err.errors
								? Object.keys(err.errors).map((key) => err.errors[key].message)
								: ["Unable to create driver user"],
						);
						req.flash("data", req.body);
						res.redirect("/signup");
					}
				});
			} else {
				req.flash(
					"validationErrors",
					err.errors
						? Object.keys(err.errors).map((key) => err.errors[key].message)
						: ["Error creating user"],
				);
				req.flash("data", req.body);
				res.redirect("/signup");
			}
		});
	} else if (req.body.userType === "Admin") {
		// creating document in 'User' Collection for user types other than 'Driver'
		User.create(userObj, (err, user) => {
			if (!err) {
				req.flash("serverMsgs", ["Signup successful."]);
				res.redirect("/login");
			} else {
				req.flash(
					"validationErrors",
					err.errors
						? Object.keys(err.errors).map((key) => err.errors[key].message)
						: ["Unable to create user"],
				);

				req.flash("data", req.body);
				res.redirect("/signup");
			}
		});
	} else if (req.body.userType === "Examiner") {
		// creating document in 'User' Collection for user types other than 'Driver'
		User.create(userObj, (err, user) => {
			if (!err) {
				req.flash("serverMsgs", ["Signup for 'Examiner' successful."]);
				res.redirect("/login");
			} else {
				req.flash(
					"validationErrors",
					err.errors
						? Object.keys(err.errors).map((key) => err.errors[key].message)
						: ["Unable to create user"],
				);

				req.flash("data", req.body);
				res.redirect("/signup");
			}
		});
	}
};
