const Driver = require("../models/Driver");

module.exports = async function updateDriverDetails(req, res) {
	const update = {
		address: {
			houseNumber: req.body.inputHouseNumber,
			street: req.body.inputStreet,
			city: req.body.inputCity,
			province: req.body.inputProvince,
			postalCode: req.body.inputPostalCode,
		},
		carMake: req.body.inputCarMake,
		carModel: req.body.inputCarModel,
		carYear: req.body.inputCarYear,
		carPlatNumber: req.body.inputCarPlatNumber,
	};
	Driver.findOneAndUpdate({ userID: req.body.userID }, update, {
		new: true,
	})
		.populate("userID")
		.exec((err, driverObj) => {
			if (err) {
				req.flash(
					"validationErrors",
					err.errors
						? Object.keys(err.errors).map((key) => err.errors[key].message)
						: ["Unable to update driver details"],
				);
				req.flash("data", req.body);
				res.redirect("/drivers/g2-page");
			} else {
				req.flash("serverMsgs", ["Update successful"]);
				res.redirect("/drivers/g2-page");
			}
		});
};
