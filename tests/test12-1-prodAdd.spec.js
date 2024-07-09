import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: ' Products' }).click();
  await page.frameLocator('iframe[name="aswift_6"]').getByLabel('Close ad').click();
  await page.locator('div:nth-child(4) > .product-image-wrapper > .single-products > .product-overlay > .overlay-content > .btn').click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.locator('.overlay-content > .btn').first().click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.locator('div:nth-child(5) > .product-image-wrapper > .single-products > .product-overlay > .overlay-content > .btn').click();
  await expect(page.getByText('')).toBeVisible();
  await expect(page.getByText('Your product has been added')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
  await page.getByRole('link', { name: 'View Cart' }).click();
  await page.getByRole('cell', { name: 'Rs. 400' }).first().click();
  await expect(page.getByRole('link', { name: 'Men Tshirt' })).toBeVisible();
  await expect(page.getByText('Rs. 400').first()).toBeVisible();
  await expect(page.getByRole('row', { name: 'Product Image Men Tshirt Men' }).getByRole('button')).toBeVisible();
  await expect(page.getByText('Rs. 400').nth(1)).toBeVisible();
});