import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await expect(page.locator('div').filter({ hasText: 'Home  Products Cart Signup' }).nth(2)).toBeVisible();
  await page.locator('.choose > .nav > li > a').first().click();

  if(await page.frameLocator('iframe[name="aswift_6"]').getByLabel('Close ad').isVisible()) {
    await page.frameLocator('iframe[name="aswift_6"]').getByLabel('Close ad').click();
  }

  await page.locator('#quantity').click();
  await page.locator('#quantity').fill('4');
  await page.getByRole('button', { name: ' Add to cart' }).click();
  await page.getByRole('link', { name: 'View Cart' }).click();
  await expect(page.locator('#product-1')).toContainText('4');

});

