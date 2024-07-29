for (const icon of document.querySelectorAll(".togglePassword")) {
	icon.addEventListener("click", function () {
		const input = this.closest(".input-group").querySelector(
			'input[type="password"], input[type="text"]',
		);
		const type =
			input.getAttribute("type") === "password" ? "text" : "password";
		input.setAttribute("type", type);

		// Toggle the eye icon
		const icon = this.querySelector("i");
		icon.classList.toggle("fa-eye");
		icon.classList.toggle("fa-eye-slash");
	});
}
