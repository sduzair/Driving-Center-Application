// @ts-check
import { expect, test } from "@playwright/test";

const getUsername = (username, browserName) => `${username} ${browserName}`;

test.describe("Tests requiring account deletion in teardown", () => {
	const username = "Alan Rickman";
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
			.fill(getUsername(username, browserName));
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
		await loginAndDeleteUser(
			page,
			getUsername(username, browserName),
			password,
		);
	});
});

test.describe("Tests requiring accounts to be created in setup", () => {
	const username = "Rupert Grint";
	const password = "iamrupertgrint123";
	test("Username should not be duplicate", async ({ page, browserName }) => {
		// Given I am on the signup page
		await page.goto("/signup");

		// When I enter an existing username And I submit the form
		await page.getByPlaceholder("Enter a username").click();
		await page
			.getByPlaceholder("Enter a username")
			.fill(getUsername(username, browserName));
		await page.getByPlaceholder("Enter password").click();
		await page.getByPlaceholder("Enter password").fill(password);
		await page.getByPlaceholder("Repeat password").click();
		await page.getByPlaceholder("Repeat password").fill(password);
		await page.getByLabel("User type select").selectOption("Driver");
		await page.getByRole("button", { name: "Signup" }).click();

		// Then I should see an error message And I should remain on the signup page
		await expect(page.locator("#loginForm")).toContainText(
			/Error, expected `username` to be unique. Value: .*/,
		);
		await expect(page).toHaveURL(/.*signup/);
	});

	test.beforeEach(
		"Create user account with a username",
		async ({ page, browserName }) => {
			await page.request.post("/users/signup", {
				data: {
					username: getUsername(username, browserName),
					password: password,
					passwordRepeat: password,
					userType: "Driver",
				},
			});
		},
	);

	test.afterEach("Delete created user", async ({ page, browserName }) => {
		await loginAndDeleteUser(page, getUsername(browserName), password);
	});
});

async function loginAndDeleteUser(page, username, password) {
	await page.request.post("/users/login", {
		data: {
			username,
			password,
		},
	});
	await page.request.delete("/users/delete");
}
