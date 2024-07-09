import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('purna5@gmail.com');
  await page.getByPlaceholder('Password').fill('Smile@369');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Logged in as Purna')).toBeVisible();
  await page.getByRole('link', { name: ' Logout' }).click();
  await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();

    // await page.pause();
    // await page.close();

}); 