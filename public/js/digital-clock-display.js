document.addEventListener("DOMContentLoaded", async () => {
	let [month, day, year] = document
		.getElementById("appointmentDate")
		.textContent.split("/");
	const [hours, mins] = document
		.getElementById("appointmentTime")
		.textContent.split(":");

	const aptDate = new Date(
		Number.parseInt(year),
		Number.parseInt(month) - 1,
		Number.parseInt(day),
		Number.parseInt(hours),
		Number.parseInt(mins),
	);

	month = aptDate.toLocaleString("en-us", {
		month: "long",
		timeZone: "America/Toronto",
	});

	const weekDay = aptDate.toLocaleString("en-us", {
		weekday: "long",
		timeZone: "America/Toronto",
	});

	document.getElementById("dayname").textContent = weekDay;
	document.getElementById("month").textContent = month;
	document.getElementById("daynum").textContent = day;
	document.getElementById("year").textContent = year;
	document.getElementById("hour").textContent = hours;
	document.getElementById("minutes").textContent = mins;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				entry.target.classList.toggle("hoverDateTime", entry.isIntersecting);
				if (entry.isIntersecting) observer.unobserve(entry.target);
			}
		},
		{
			threshold: 1,
		},
	);

	observer.observe(document.querySelector("div.datetime"));
});
