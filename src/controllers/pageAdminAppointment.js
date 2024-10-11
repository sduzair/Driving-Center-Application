module.exports = (req, res) => {
	const serverTime = new Date().toLocaleString("en", {
		timeZone: "America/Toronto",
	});

	const data = req.flash("data")[0];
	res.render("admin/appointment_page", {
		serverMsgs: req.flash("serverMsgs"),
		errors: req.flash("validationErrors"),
		data: data,
		serverTime: serverTime,
	});
};
