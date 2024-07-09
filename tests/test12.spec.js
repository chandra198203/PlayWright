import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: ' Products' }).click();

  if(await page.frameLocator('iframe[name="aswift_6"]').getByLabel('Close ad').isVisible()){
    await page.frameLocator('iframe[name="aswift_6"]').getByLabel('Close ad').click()
  }
  
  await page.locator('//a[@data-product-id="1"]').first().click()
  await page.getByRole('button', { name: 'Continue Shopping' }).click();

  await page.locator('//a[@data-product-id="2"]').first().click()
  
//div[contains(@class,'productinfo text-center')]//p[text()='Blue Top']/following-sibling::a
//.features_items > .productinfo > .btn

  /*
  await expect(page.getByText('Blue Top').nth(1)).toBeVisible();
  await page.locator('.overlay-content > .btn').first().click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();

  await expect(page.getByRole('heading', { name: 'Rs. 400' }).nth(1)).toBeVisible();
  await expect(page.getByText('Men Tshirt').nth(2)).toBeVisible();
  await page.locator('div:nth-child(4) > .product-image-wrapper > .single-products > .product-overlay > .overlay-content > .btn').click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();

  //await page.locator('div:nth-child(5) > .product-image-wrapper > .single-products > .product-overlay > .overlay-content > .btn').click();*/

  await page.getByRole('link', { name: 'View Cart' }).click();
  await expect(page.getByRole('link', { name: 'Blue Top' })).toBeVisible();
  await expect(page.getByText('Rs. 500').first()).toBeVisible();
  await expect(page.getByRole('row', { name: 'Product Image Blue Top Women' }).getByRole('button')).toBeVisible();
  await expect(page.getByText('Rs. 500').nth(1)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Men Tshirt' })).toBeVisible();
  await expect(page.getByText('Rs. 400').first()).toBeVisible();
  await expect(page.getByRole('row', { name: 'Product Image Men Tshirt Men' }).getByRole('button')).toBeVisible();
  await expect(page.getByText('Rs. 400').nth(1)).toBeVisible();
  await expect(page.getByText('Proceed To Checkout')).toBeVisible();
});

//**************Dynamic selection based on the script inputx` */