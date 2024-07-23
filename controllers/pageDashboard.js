module.exports = (req, res) => {
	res.render("driver/dashboard", {
		serverMsgs: req.flash("serverMsgs"),
		errors: req.flash("validationErrors"),
	});
};
