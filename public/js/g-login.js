function clearFocusAndSelect(element) {
	element.value = "";
	element.focus();
	element.select();
}

function enteringUserID() {
	clearTextBoxes();
	focusAndSelect("degrees_entered");
	$("degree_label_1").firstChild.textContent = "Enter F degrees:";
}

window.addEventListener("DOMContentLoaded", () => {
	const radioUserID = document.querySelector("#radioUserID");
	const radioLicenceNumber = document.querySelector("#radioLicenceNumber");
	const credentialLabel = document.querySelector("#credential label");
	const credentialInput = document.querySelector("#credential input");

	radioUserID.addEventListener("click", () => {
		credentialLabel.textContent = "Enter User ID";
		// credentialInput.type = 'number';
		clearFocusAndSelect(credentialInput);
	});

	radioLicenceNumber.addEventListener("click", () => {
		credentialLabel.textContent = "Enter Licence Number";
		clearFocusAndSelect(credentialInput);
	});
});
