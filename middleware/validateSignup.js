const USER_TYPES = {
	DRIVER: "Driver",
	EXAMINER: "Examiner",
	ADMIN: "Admin",
};

const isValueProvided = (value) => value && value.trim() !== "";
const isValidPassword = (password) =>
	checkPasswordStrength(password) !== "Weak";
const isValidUserType = (userType) =>
	userType &&
	userType.trim() !== "" &&
	Object.values(USER_TYPES).includes(userType);
const isPasswordMatch = (password, passwordRepeat) =>
	password === passwordRepeat;

module.exports = (req, res, next) => {
	const { username, password, passwordRepeat, userType } = req.body;

	// Check if required fields are undefined or empty
	if (
		!isValueProvided(username) ||
		!isValueProvided(password) ||
		!isValueProvided(passwordRepeat) ||
		!isValueProvided(userType) ||
		!isPasswordMatch(password, passwordRepeat) ||
		!isValidPassword(password) ||
		!isValidUserType(userType)
	) {
		return res.render("signup", {
			serverMsgs: null,
			errors: ["Please ensure that all required fields have valid values"],
			data: {
				username: isValueProvided(username) ? username : "",
				userType: isValueProvided(userType) ? userType : "",
			},
			inputFieldErrors: {
				username: !isValueProvided(username) ? "Please enter a username" : null,
				password: !isValueProvided(password)
					? "Please enter a password"
					: !isValidPassword(password)
						? `Please enter a stronger password your password is ${checkPasswordStrength(password)}`
						: null,
				passwordRepeat: !isValueProvided(passwordRepeat)
					? "Please reenter your password"
					: !isPasswordMatch(password, passwordRepeat)
						? "The passwords do not match"
						: null,
				userType: !isValueProvided(userType)
					? "Please enter a user type"
					: !isValidUserType(userType)
						? `Invalid user type. Please select one of: ${Object.values(USER_TYPES).join(", ")}`
						: null,
			},
		});
	}

	next();
};

function checkPasswordStrength(password) {
	let strength = 0;
	if (password.length >= 8) strength++;
	if (password.match(/[a-z]+/)) strength++;
	if (password.match(/[A-Z]+/)) strength++;
	if (password.match(/[0-9]+/)) strength++;
	if (password.match(/[$@#&!]+/)) strength++;

	if (strength < 2) return "Weak";
	if (strength < 4) return "Moderate";
	return "Strong";
}
