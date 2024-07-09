import { test, expect } from '@playwright/test';

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


    //await page.locator("//div[contains(@class,'productinfo text-center')]//p[text()='Blue Top']/following-sibling::a").click()
    await page.locator('.single-products > .productinfo >.btn').nth(0).hover();
    await page.locator('.single-products > .productinfo >.btn').nth(0).click();
    await expect(page.getByText('')).toBeVisible();
    await expect(page.getByText('Your product has been added')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();

    //await page.locator('div:nth-child(4) > .product-image-wrapper > .single-products > .product-overlay > .overlay-content > .btn').click();
    //await page.locator("//div[contains(@class,'productinfo text-center')]//p[text()='Men Tshirt']/following-sibling::a").first().click()
    await page.locator('.single-products > .productinfo >.btn').nth(1).hover();
    await page.locator('.single-products > .productinfo >.btn').nth(1).click();
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View Cart' })).toBeVisible();
    await page.getByRole('link', { name: 'View Cart' }).click();
    // await page.locator('#product-1').getByRole('link', { name: 'Product Image' }).click();
    // await page.getByRole('link', { name: 'Blue Top' }).click();
    // await page.goto('https://automationexercise.com/view_cart');

   const TotalRows =await page.locator('table tbody tr').count()
      console.log("total number of rows in the table", TotalRows);

    let list_of_products = await page.$$("css=td.cart_product")
      console.log("total number of rows in the table", list_of_products.length);

    for (let i=1;i<=TotalRows;i++){

        await expect(page.locator(`[id='product-${i}'] > .cart_description`)).toBeVisible();
        await expect(page.locator(`[id='product-${i}'] > .cart_price`)).toBeVisible();
        await expect(page.locator(`#product-${i} > .cart_quantity > .disabled`)).toBeVisible();
        await expect(page.locator(`#product-${i} > .cart_total > .cart_total_price`)).toBeVisible();
        
        // await expect(page.locator(`#product-${i} > .cart_price`)).toBeVisible();
        // await expect(page.locator(`#product-${i} > .cart_quantity > .disabled`)).toBeVisible();
        // await expect(page.locator(`#product-${i} > .cart_total > .cart_total_price`)).toBeVisible();

  
    }

    // await page.pause();

    // for(let i=0;i<)
    // await expect(page.getByText('Rs.').first()).toBeVisible();
    // await expect(page.getByRole('row', { name: 'Product Image Blue Top Women' }).getByRole('button')).toBeVisible();
    // await expect(page.getByText('Rs.').nth(1)).toBeVisible();
    // await expect(page.locator('#product-2').getByRole('link', { name: 'Product Image' })).toBeVisible();
    // await expect(page.getByRole('link', { name: 'Men Tshirt' })).toBeVisible();
    // await expect(page.getByText('Rs.').nth(2)).toBeVisible();
    // await expect(page.getByRole('row', { name: 'Product Image Men Tshirt Men' }).getByRole('button')).toBeVisible();
    // await expect(page.getByText('Rs.').nth(3)).toBeVisible();
});

//div[@class="table-responsive cart_info"]//tr[@id="product-1"]//a[text()='Blue Top']

//div[@class="table-responsive cart_info"]//tr[@id="product-1"]//a[text()='Blue Top']
//div[@class="table-responsive cart_info"]//tr[@id="product-1"]//a[text()='Blue Top']