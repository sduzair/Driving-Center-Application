module.exports = (req, res) => {
	res.render("admin/dashboard", {
		serverMsgs: req.flash("serverMsgs"),
		errors: req.flash("validationErrors"),
	});
};
