import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await expect(page.locator('div').filter({ hasText: 'Home  Products Cart Signup' }).nth(2)).toBeVisible();
  await page.getByRole('link', { name: ' Products' }).click();

  if(await page.frameLocator('iframe[name="aswift_6"]').getByLabel('Close ad').isVisible()){
    await page.frameLocator('iframe[name="aswift_6"]').getByLabel('Close ad').click();
  }

  await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
  await expect(page.getByText('All Products  Added! Your')).toBeVisible();
  await page.locator('.choose > .nav > li > a').first().click();
  //await expect(page.getByRole('heading', { name: 'Blue Top' })).toBeVisible();
  await expect(page.getByText('Rs.')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Blue Top' })).toBeVisible();
  await expect(page.getByText('Category: Women > Tops')).toBeVisible();
  await expect(page.getByText('Rs.')).toBeVisible();
  await expect(page.getByText('Availability: In Stock')).toBeVisible();
  await expect(page.getByText('Brand: Polo')).toBeVisible();
});

//***********Unknown ads are coming..