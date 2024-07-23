module.exports = (req, res) => {
	// console.log( req.flash( 'validationErrors' ) )
	res.render("login", {
		errors: req.flash("validationErrors"),
		serverMsgs: req.flash("serverMsgs"),
	});
};
