import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: ' Products' }).click();

  const searchProduct="Blue top"

  if (page.frameLocator('iframe[name="aswift_6"]').getByLabel('Close ad').isVisible()){
    await page.frameLocator('iframe[name="aswift_6"]').getByLabel('Close ad').click();
  }
  await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
  await expect(page.getByPlaceholder('Search Product')).toBeVisible();
  await page.getByPlaceholder('Search Product').click();
  await page.getByPlaceholder('Search Product').fill(searchProduct);
  await page.getByRole('button', { name: '' }).click();
  await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();
  //await page.getByText('Blue Top').nth(1).click();
  await expect(page.getByText(searchProduct).nth(1)).toBeVisible();
});

