import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: ' Products' }).click();
  await page.frameLocator('iframe[name="aswift_6"]').getByLabel('Close ad').click();
  await page.locator('.overlay-content > .btn').first().click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.locator('div:nth-child(4) > .product-image-wrapper > .single-products > .product-overlay > .overlay-content > .btn').click();
  await page.getByRole('link', { name: 'View Cart' }).click();
  await page.getByRole('link', { name: 'Blue Top' }).click({
    button: 'right'
  });
  await page.getByRole('link', { name: 'Blue Top' }).click();
});