for (const inputElement of document.querySelectorAll(
	"form.userDetails input",
)) {
	inputElement.addEventListener("input", () => {
		document
			.querySelector("form.userDetails button[type=submit]")
			.removeAttribute("disabled");
	});
}
