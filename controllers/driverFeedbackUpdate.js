const Driver = require("../models/Driver");

// ****************************VALIDATORS CAN NEVER BE RUN ON UNDEFINED VALUES
module.exports = (req, res) => {
	const { _id, examinerComment, testResult } = req.body;
	const update = {
		examinerComment: examinerComment,
		testResult: testResult, // *<<<<<<<<<<<<<SO WE DO THIS
	};

	Driver.findOneAndUpdate(
		{ _id: _id },
		update,
		{ new: true },
		(err, driver) => {
			if (err || !driver) {
				req.flash(
					"validationErrors",
					err?.errors
						? Object.keys(err.errors).map((key) => err.errors[key].message)
						: ["Unable to update examiner's feedback."],
				);
			} else {
				req.flash("serverMsgs", [
					"Examiner's feedback is updated successfully.",
				]);
			}
			res.redirect("/examiners/appointments-page");
		},
	);
};
