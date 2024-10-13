// @ts-check
import { expect, test } from "@playwright/test";

const getUsername = (browserName) => `Alan Rickman ${browserName}`;
const password = "mynameisalan123";

test("Successful signup should redirect to login page", async ({
	page,
	browserName,
}) => {
	// Given a user is on the signup page
	await page.goto("/signup");

	// When they fill out the form correctly and submit
	await page.getByPlaceholder("Enter a username").click();
	await page
		.getByPlaceholder("Enter a username")
		.fill(getUsername(browserName));
	await page.getByPlaceholder("Enter password").click();
	await page.getByPlaceholder("Enter password").fill(password);
	await page.getByPlaceholder("Repeat password").click();
	await page.getByPlaceholder("Repeat password").fill(password);
	await page.getByLabel("User type select").selectOption("Driver");
	await page.getByRole("button", { name: "Signup" }).click();

	// Then they should be redirected to the login page with visible login elements
	await expect(page).toHaveURL(/.*login/);
	await expect(page.getByPlaceholder("Enter a valid username")).toBeVisible();
	await expect(page.getByPlaceholder("Enter password")).toBeVisible();
	await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});

test.afterEach("Delete created user", async ({ page, browserName }) => {
	await page.request.post("/users/login", {
		data: {
			username: getUsername(browserName),
			password: `${password}`,
		},
	});
	await page.request.delete("/users/delete");
});
