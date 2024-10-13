const User = require("../models/User");

module.exports = (req, res, next) => {
	User.findByIdAndDelete(req.session.userId, (error, user) => {
		if (error || !user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(204).send();
	});
};
