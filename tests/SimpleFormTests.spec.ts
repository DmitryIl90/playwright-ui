import { test, expect } from "@playwright/test";
import {faker} from "@faker-js/faker/locale/ar";

test.describe("Local simple form tests", async () => {

    test.only('Form opens', async ({ page }) => {
        // locators
        const BaseURL = (process.env.BaseURL);
        const loginField = page.getByTestId("username-input");
        const passwordField = page.getByTestId("password-input");
        const signInButton = page.getByTestId("signIn-button");
        const inputError = page.getByTestId("username-input-error");
        const popupMessage = page.getByTestId("authorizationError-popup");
        const popupCloseButton = page.getByTestId("authorizationError-popup-close-button");
        const randomUsername = faker.internet.username();
        const randomPassword = faker.internet.password({length: 10})

        // actions
        await page.goto(BaseURL);
        await expect(loginField).toBeVisible();
        await expect(passwordField).toBeVisible();
        await expect(signInButton).toBeVisible();
        await expect(inputError).not.toBeVisible();
        await expect(signInButton).toBeDisabled();
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
        await expect(inputError).toBeVisible();
        await loginField.fill(randomUsername);
        await expect(inputError).not.toBeVisible();
        await passwordField.fill("");
        await expect(inputError).toBeVisible();
        await expect(signInButton).toBeDisabled();
    });
})
