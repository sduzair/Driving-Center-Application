// middleware is applied to login/signup to check if user is already authenticated
module.exports = (req, res, next) => {
	if (req.session.userId) {
		return res.redirect("/");
	}
	next();
};
