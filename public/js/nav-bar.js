document.addEventListener("DOMContentLoaded", () => {
	let current = 0;
	for (let i = 0; i < document.links.length; i++) {
		if (document.URL.includes(document.links[i].href)) {
			current = i;
		}
	}
	document.links[current].className =
		`${document.links[current].className} active`;
});
