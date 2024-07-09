import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  
  await page.goto('https://automationexercise.com/');
  await expect(page.locator('div').filter({ hasText: 'Home  Products Cart Signup' }).nth(2)).toBeVisible();
  await page.locator('li').filter({ hasText: 'Test Cases' }).click();
   

  if(await page.frameLocator('iframe[name="aswift_6"]').getByLabel('Close ad').isVisible())
    {
        const CloseOption1= await page.frameLocator('iframe[name="aswift_6"]').getByLabel('Close ad')
        CloseOption1.click()
    }
  
  if(await page.frameLocator('iframe[name="aswift_6"]').frameLocator('iframe[name="ad_iframe"]').getByLabel('Close ad').isVisible())
    {
        const CloseOption2= await page.frameLocator('iframe[name="aswift_6"]').frameLocator('iframe[name="ad_iframe"]').getByLabel('Close ad')
        CloseOption2.click() 
    }
  

  await expect(page.locator('b')).toBeVisible();
});

