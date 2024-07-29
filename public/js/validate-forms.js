// see https://getbootstrap.com/docs/5.1/forms/validation/#custom-styles
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	const forms = document.querySelectorAll(".needs-validation");

	// Loop over them and prevent submission
	for (const form of Array.prototype.slice.call(forms)) {
		form.addEventListener(
			"submit",
			(event) => {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				}

				form.classList.add("was-validated");
			},
			false,
		);
	}
})();
