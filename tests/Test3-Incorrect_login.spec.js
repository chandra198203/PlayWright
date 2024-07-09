import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('purna5@gmail.com');
  await page.getByPlaceholder('Password').fill('Smile@3699');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Your email or password is')).toBeVisible();
  await expect(page.locator('#form')).toContainText('Your email or password is incorrect!');

  await page.pause();
await page.close();

}); 
