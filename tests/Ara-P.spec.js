import { test, expect } from '@playwright/test';

test('Test Case 12: Add Products in Cart', async ({ page }) => {
    await test.step('Navigate to Automation Exercise Website', async () => {
        await page.goto('https://automationexercise.com/');
    });

    await test.step('Verify that home page is visible successfully', async () => {
        await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
    });

    await test.step('Click on Products Link and Handle Ads', async () => {
        const linkElement = await page.getByRole('link', { name: ' Products' });
        const Url = await linkElement.evaluate(el => el.href);
        console.log("URL:", Url); 
        await page.getByRole('link', { name: ' Products' }).click();
        if (page.url().includes('google_vignette')) {
            await page.goto(Url);
        }
    });
    
    
    await test.step("Hover over first product and click 'Add to cart'", async () => {
        await page.locator('.productinfo > .btn').first().hover();
        await page.locator('.overlay-content > .btn').first().click();
    });

    await test.step('Verify if Product added Successfully', async () => {
        await expect(page.getByText('')).toBeVisible();
        await expect(page.getByText('Your product has been added')).toBeVisible();
        await expect(page.getByRole('link', { name: 'View Cart' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
        await page.getByRole('button', { name: 'Continue Shopping' }).click();
        
    });

    await test.step("Hover over second product and click 'Add to cart'", async () => {
        await page.locator('.productinfo > .btn').nth(1).hover();
        await page.locator('.overlay-content > .btn').nth(1).click();
    });

    await test.step('Verify if Product added Successfully', async () => {
        await expect(page.getByText('')).toBeVisible();
        await expect(page.getByText('Your product has been added')).toBeVisible();
        await expect(page.getByRole('link', { name: 'View Cart' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
        
    });

    await test.step("Click 'View Cart' button", async () => {
        await page.getByRole('link', { name: 'View Cart' }).click();
    });
    
    await test.step('Verify if both the products are added to cart', async () => {
        let list_of_products = await page.$$("css=td.cart_product")
        await expect(list_of_products.length).toBe(2)
        await expect(page.locator('#product-1').getByRole('link', { name: 'Blue Top' })).toBeVisible();
        await expect(page.locator('#product-2').getByRole('link', { name: 'Men Tshirt' })).toBeVisible();
    });
    
    await test.step('Verify their prices, quantity and total price', async () => {
        let list_of_products = await page.$$("css=td.cart_product")
        for (let i = 1; i <= list_of_products.length; i++) {
        await expect(page.locator(`#product-${i} > .cart_price`)).toBeVisible();
        await expect(page.locator(`#product-${i} > .cart_quantity > .disabled`)).toBeVisible();
        await expect(page.locator(`#product-${i} > .cart_total > .cart_total_price`)).toBeVisible();
       }
    });
});