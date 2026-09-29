// import { test, expect } from '@playwright/test';

// test('valid user can log in', async ({ page }) => {
//   await page.goto('https://www.saucedemo.com/');
//   await page.getByPlaceholder('Username').fill('standard_user');
//   await page.getByPlaceholder('Password').fill('secret_sauce');
//   await page.getByRole('button', { name: 'Login' }).click();

//   await expect(page).toHaveURL(/inventory/);
//   await expect(page.locator('.inventory_item')).toHaveCount(6);
// });

// //failed login test

// test('invalid user cannot log in', async ({ page }) => {
//   await page.goto('https://www.saucedemo.com/');
//   await page.getByPlaceholder('Username').fill('standard_user');
//   await page.getByPlaceholder('Password').fill('wrong_password');
//   await page.getByRole('button', { name: 'Login' }).click();

//   await expect(page.locator('.error-message-container')).toBeVisible();
//   await expect(page.locator('.error-message-container')).toContainText('do not match');
// });

import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('valid user can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await page.waitForURL(/inventory/);
});

test('invalid user cannot log in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'wrong_password');

  await loginPage.expectLoginError('do not match');
});