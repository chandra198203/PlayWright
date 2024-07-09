import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  const eMail='purna5@gmail.com'
  
  await expect(page.locator('div').filter({ hasText: 'Home  Products Cart Signup' }).nth(2)).toBeVisible();
  await page.getByRole('link', { name: ' Cart' }).click();
  await expect(page.getByRole('heading', { name: 'Subscription' })).toBeVisible();
  await page.getByPlaceholder('Your email address').click();
  
  await page.getByPlaceholder('Your email address').fill(eMail);
  await page.getByRole('button', { name: '' }).click();
  await expect(page.getByText('You have been successfully')).toBeVisible()

  //await page.getByText('You have been successfully').click();
});