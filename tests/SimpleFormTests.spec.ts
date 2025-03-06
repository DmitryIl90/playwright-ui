import { test, expect } from "@playwright/test";

test.describe("Local simple form tests", async () => {
    test.beforeEach(async ({ page }) => {
        const path = require('path');
        const BaseURL = `file://${path.resolve(process.env.BaseURL)}`;
        await page.goto(BaseURL );
    })

    test('Form opens', async ({ page }) => {
        // locators
        const loginField = page.getByTestId("username-input");
        const passwordField = page.getByTestId("password-input");
        const signInButton = page.getByTestId("signIn-button");
        const inputError = page.getByTestId("username-input-error");
        const popupMessage = page.getByTestId("authorizationError-popup");
        const popupCloseButton = page.getByTestId("authorizationError-popup-close-button");

        // actions
        await expect(loginField).toBeVisible();
        await expect(passwordField).toBeVisible();
        await expect(signInButton).toBeVisible();
        await expect(inputError).not.toBeVisible();
        await expect(signInButton).toBeDisabled();
        await loginField.fill("123")
        await passwordField.fill("testestest");
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
        await loginField.fill("123");
        await expect(inputError).not.toBeVisible();
        await passwordField.fill("");
        await expect(inputError).toBeVisible();
        await expect(signInButton).toBeDisabled();
    });
})
