import { test, expect } from "@playwright/test";
import {faker} from "@faker-js/faker/locale/ar";

test.describe("Local simple form tests", async () => {

    test('Negative tests for opens form', async ({ page }) => {
        // locators
        const APPURL = process.env.APPURL || 'https://fe-delivery.tallinn-learning.ee/';
        const loginField = page.getByTestId("username-input");
        const passwordField = page.getByTestId("password-input");
        const signInButton = page.getByTestId("signIn-button");
        const loginInputError = page.getByTestId("username-input-error").first();
        const passwordInputError = page.getByTestId("username-input-error").nth(1);
        const popupMessage = page.getByTestId("authorizationError-popup");
        const popupCloseButton = page.getByTestId("authorizationError-popup-close-button");
        const randomUsername = faker.internet.username();
        const randomPassword = faker.internet.password({length: 10})

        // actions
        await page.goto(APPURL);
        await expect(loginField).toBeVisible();
        await expect(passwordField).toBeVisible();
        await expect(signInButton).toBeVisible();
        await expect(signInButton).toBeEnabled();
        await loginField.fill(randomUsername);
        await passwordField.fill(randomPassword);
        await expect(signInButton).toBeEnabled();
        await expect(popupMessage).not.toBeVisible();
        await expect(popupCloseButton).not.toBeVisible();
        await signInButton.click();
        await expect(popupMessage).toBeVisible();
        await expect(popupCloseButton).toBeVisible();
        await popupCloseButton.click();
        await expect(popupMessage).not.toBeVisible();
        await expect(popupCloseButton).not.toBeVisible();
        await loginField.fill("");
        await expect(loginInputError).toBeVisible();
        await loginField.fill(randomUsername);
        await expect(loginInputError).not.toBeVisible();
        await passwordField.fill("");
        await expect(passwordInputError).toBeVisible();
        await expect(signInButton).toBeDisabled();
    });
})
