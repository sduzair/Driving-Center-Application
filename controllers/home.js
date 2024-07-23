module.exports = (req, res) => {
	res.render("index", {
		serverMsgs: req.flash("serverMsgs"),
		errors: req.flash("validationErrors"),
	});
};
