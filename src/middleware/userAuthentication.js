module.exports = (req, res, next) => {
	if (!req.session.userId) {
		req.flash("validationErrors", ["Unauthenticated request"]);
		return res.redirect("/login");
	}
	next();
};
