import { test, expect } from '@playwright/test';
const products = require('../test-data/Products.json');

test('test', async ({ page }) => {
    await page.goto('https://automationexercise.com/');
    await expect(page.getByRole('link', { name: ' Products' })).toBeVisible();


    await test.step('Click on Products Link and Handle Ads', async () => {
        const linkElement = await page.getByRole('link', { name: ' Products' });
        const Url = await linkElement.evaluate(el => el.href);
        console.log("URL:", Url);
        await page.getByRole('link', { name: ' Products' }).click();
        if (page.url().includes('google_vignette')) {
            await page.goto(Url);
        }

    });

    await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();

    await page.locator("//div[contains(@class,'productinfo text-center')]//p[text()='Blue Top']/following-sibling::a").first().hover()
    await page.locator("//div[contains(@class,'productinfo text-center')]//p[text()='Blue Top']/following-sibling::a").first().click()
    await expect(page.getByText('')).toBeVisible();
    await expect(page.getByText('Your product has been added')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();

    await page.locator("//div[contains(@class,'productinfo text-center')]//p[text()='Men Tshirt']/following-sibling::a").first().hover()
    await page.locator("//div[contains(@class,'productinfo text-center')]//p[text()='Men Tshirt']/following-sibling::a").first().click()
    await expect(page.getByText('')).toBeVisible();
    await expect(page.getByText('Your product has been added')).toBeVisible();
    await expect(page.getByRole('link', { name: 'View Cart' })).toBeVisible();
    await page.getByRole('link', { name: 'View Cart' }).click();


    const TotalRows = await page.locator('table tbody tr').count()
    console.log("total number of rows in the table", TotalRows);

    let list_of_products = await page.$$("css=td.cart_product")
    console.log("total number of rows in the table", list_of_products.length);

    await page.pause();

    for (let i = 1; i <= TotalRows; i++) {

        await expect(page.locator(`[id='product-${i}'] > .cart_description`)).toBeVisible();
        await expect(page.locator(`[id='product-${i}'] > .cart_price`)).toBeVisible();
        await expect(page.locator(`#product-${i} > .cart_quantity > .disabled`)).toBeVisible();
        await expect(page.locator(`#product-${i} > .cart_total > .cart_total_price`)).toBeVisible();


    }

});

    // for (let counter = 1; counter <= products.prodCount; counter++) {


    //     let productName = products.productName1
    //     let productName1 = products.produ
    //     console.log(productName)
    //     console.log(productName1)

    //     page.pause()}
