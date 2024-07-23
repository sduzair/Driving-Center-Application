module.exports = (req, res, next) => {
	if (req.body.username === "" || req.body.password === "") {
		return res.render("login", {
			serverMsgs: null,
			errors: ["Please ensure that all required fields have a value"],
		});
	}
	next();
};
