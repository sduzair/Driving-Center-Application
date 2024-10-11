module.exports = (req, res) => {
	res.render("signup", {
		errors: req.flash("validationErrors"),
		data: req.flash("data")[0],
		inputFieldErrors: req.flash("inputFieldErrors")[0],
		serverMsgs: null,
	});
};
