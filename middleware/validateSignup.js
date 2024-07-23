module.exports = (req, res, next) => {
	// if( req.body.username == "" || req.body.password == "" || req.body.userType == "" ) {
	//   return res.render( "signup", {
	//     serverMsgs: null,
	//     errors: [ "Please ensure that all required fields have a value" ],
	//   } )
	// }
	if (req.body.passwordRepeat !== req.body.password) {
		return res.render("signup", {
			serverMsgs: null,
			errors: ["Please ensure that the passwords match"],
			data: {
				username: req.body.username,
				userType: req.body.userType,
			},
		});
	}
	next();
};
