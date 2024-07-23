const Driver = require("../models/Driver");

module.exports = async function readDriverDetails(req, res) {
	const [driver] =
		req.body.gLoginRadio === "licenceNumber"
			? await Driver.find({
					carLicenceNumber: req.body.inputCredential,
				})
			: await Driver.find({
					userID: req.body.inputCredential,
				});

	if (driver) {
		driver.DOB = new Date(driver.DOB).toISOString().substring(0, 10);
		res.render("driver/g_page", {
			driver: driver,
			msg: "Driver details found",
		});
	} else
		res.status(401).render("driver/g2_page", {
			msg: "No such user exists!",
		});
};
