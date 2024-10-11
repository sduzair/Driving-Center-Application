module.exports = (req, res) => {
	res.render("login", {
		errors: req.flash("validationErrors"),
		serverMsgs: req.flash("serverMsgs"),
	});
};
