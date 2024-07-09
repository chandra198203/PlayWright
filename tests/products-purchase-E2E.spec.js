import { test, expect } from '@playwright/test';
const products = require('../test-data/Products.json');
const { LoginPage } = require('../Pages/Login.page');
const myuserdata = require('../test-data/loginData.json');

test('test', async ({ page }) => {
    await page.goto('https://automationexercise.com/');
    await expect(page.getByRole('link', { name: ' Products' })).toBeVisible();

    //Handle the dialogs
    await test.step('Click on Products Link and Handle Ads', async () => {
        const linkElement = await page.getByRole('link', { name: ' Products' });
        const Url = await linkElement.evaluate(el => el.href);
        console.log("URL:", Url);
        await page.getByRole('link', { name: ' Products' }).click();
        if (page.url().includes('google_vignette')) {
            await page.goto(Url);
        }

    });

    //Add the items to cart Page
    await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();

    const TotalProducts = products.product.length

    for (let counter = 0; counter < TotalProducts ; counter++) {
        let productName = products.product[counter].Prodctname;
        console.log(productName)
        
        await page.locator("//div[contains(@class,'productinfo text-center')]//p[text()='"+productName+"']/following-sibling::a").first().hover()
        await page.locator("//div[contains(@class,'productinfo text-center')]//p[text()='"+productName+"']/following-sibling::a").first().click()

        //await page.locator("//div[contains(@class,'productinfo text-center')]//p[text()='"+productName+"']/following-sibling::a").first().hover()

        await expect(page.getByText('')).toBeVisible();
        await expect(page.getByText('Your product has been added')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
        if (counter < TotalProducts-1) {
            await page.getByRole('button', { name: 'Continue Shopping' }).click();
        }


    }


    
   

    // await page.locator("//div[contains(@class,'productinfo text-center')]//p[text()='Blue Top']/following-sibling::a").first().hover()
    // await page.locator("//div[contains(@class,'productinfo text-center')]//p[text()='Blue Top']/following-sibling::a").first().click()
    // await expect(page.getByText('')).toBeVisible();
    // await expect(page.getByText('Your product has been added')).toBeVisible();
    // await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
    // await page.getByRole('button', { name: 'Continue Shopping' }).click();

    // await page.locator("//div[contains(@class,'productinfo text-center')]//p[text()='Men Tshirt']/following-sibling::a").first().hover()
    // await page.locator("//div[contains(@class,'productinfo text-center')]//p[text()='Men Tshirt']/following-sibling::a").first().click()
    // await expect(page.getByText('')).toBeVisible();
    // await expect(page.getByText('Your product has been added')).toBeVisible();
    await expect(page.getByRole('link', { name: 'View Cart' })).toBeVisible();
    await page.getByRole('link', { name: 'View Cart' }).click();

    //Verify the Cart Page
    const TotalRows = await page.locator('table tbody tr').count()
    console.log("total number of rows in the table", TotalRows);

    let list_of_products = await page.$$("css=td.cart_product")
    console.log("total number of rows in the table", list_of_products.length);

    for (let i = 1; i <=TotalRows; i++) {

        await expect(page.locator(`[id='product-${i}'] > .cart_description`)).toBeVisible();
        await expect(page.locator(`[id='product-${i}'] > .cart_price`)).toBeVisible();
        await expect(page.locator(`#product-${i} > .cart_quantity > .disabled`)).toBeVisible();
        await expect(page.locator(`#product-${i} > .cart_total > .cart_total_price`)).toBeVisible();
    }

    await page.getByText('Proceed To Checkout').click();
    await expect(page.getByText('')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Register / Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue On Cart' })).toBeVisible();
    //await page.getByRole('button', { name: 'Continue On Cart' }).click()
    const LoginIndicator = await page.getByRole('link', { name: 'Register / Login' })
    if (LoginIndicator.isVisible()) {
        await page.getByRole('link', { name: 'Register / Login' }).click();

        const Login = new LoginPage(page);
        await test.step('Verify Successful login test with valid User name and Password', async () => {
            await Login.SuccessfullLoginTest(myuserdata.ValidUserName, myuserdata.ValidPassword);
        });

    }

    await expect(await page.getByRole('link', { name: ' Cart' })).toBeVisible()
    await page.getByRole('link', { name: ' Cart' }).click();

    //await expect(page.getByText('Shopping Cart')).toBeVisible();
    await expect(page.getByText('Proceed To Checkout')).toBeVisible();
    await page.getByText('Proceed To Checkout').click();

    //await page.pause()

    //Verify the checkout Page
    await expect(page.getByText('Checkout')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Address Details' })).toBeVisible();

    await expect(page.locator('#address_delivery')).toContainText('Your delivery address');
    await expect(page.locator("//ul[@id='address_delivery']//li[@class='address_firstname address_lastname']")).toContainText('Mr. Purnaa chandra')
    await expect(page.locator("ul[id='address_delivery'] li:nth-child(3)")).toContainText('EDS')
    await expect(page.locator("ul[id='address_delivery'] li:nth-child(4)")).toContainText('11 Tels')
    await expect(page.locator("ul[id='address_delivery'] li:nth-child(5)")).toContainText('123')
    await expect(page.locator("ul[id='address_delivery'] li[class='address_city address_state_name address_postcode']")).toContainText('mtm ap 123456')
    await expect(page.locator("ul[id='address_delivery'] li[class='address_country_name']")).toContainText('India')
    await expect(page.locator("ul[id='address_delivery'] li[class='address_phone']")).toContainText('112233445566')



    await expect(page.locator("ul[id='address_invoice'] h3[class='page-subheading']")).toContainText('Your billing address');
    await expect(page.locator("//ul[@id='address_invoice']//li[@class='address_firstname address_lastname']")).toContainText('Mr. Purnaa chandra')
    await expect(page.locator("ul[id='address_invoice'] li:nth-child(3)")).toContainText('EDS')
    await expect(page.locator("ul[id='address_invoice'] li:nth-child(4)")).toContainText('11 Tels')
    await expect(page.locator("ul[id='address_invoice'] li:nth-child(5)")).toContainText('123')
    await expect(page.locator("ul[id='address_invoice'] li[class='address_city address_state_name address_postcode']")).toContainText('mtm ap 123456')
    await expect(page.locator("ul[id='address_invoice'] li[class='address_country_name']")).toContainText('India')
    await expect(page.locator("ul[id='address_invoice'] li[class='address_phone']")).toContainText('112233445566')

    await expect(page.getByRole('heading', { name: 'Review Your Order' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Item' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Description' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Price' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Quantity' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Total', exact: true })).toBeVisible();
    await expect(page.getByText('Total Amount')).toBeVisible();

    //Verify the Cart Page
    const TotalRows1 = await page.locator('table tbody tr').count()
    console.log("total number of rows in the table", TotalRows);

    let list_of_products1 = await page.$$("css=td.cart_product")
    console.log("total number of rows in the table", list_of_products.length);

    //await page.pause();

    for (let i = 1; i < TotalRows1; i++) {

        await expect(page.locator(`[id='product-${i}'] > .cart_description`)).toBeVisible();
        await expect(page.locator(`[id='product-${i}'] > .cart_price`)).toBeVisible();
        await expect(page.locator(`#product-${i} > .cart_quantity > .disabled`)).toBeVisible();
        await expect(page.locator(`#product-${i} > .cart_total > .cart_total_price`)).toBeVisible();
    }

    await expect(page.getByText('If you would like to add a')).toBeVisible();
    await expect(page.locator('label')).toContainText('If you would like to add a comment about your order, please write it in the field below.');
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Place Order' })).toBeVisible();
    await page.getByRole('link', { name: 'Place Order' }).click();





    //Payment Page
    await expect(page.locator('ol')).toContainText('Payment');
    await expect(page.locator('li').filter({ hasText: 'Payment' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Payment' })).toBeVisible();
    await expect(page.locator('#cart_items')).toContainText('Payment');
    await expect(page.getByText('Name on Card')).toBeVisible();
    await expect(page.locator('#payment-form')).toContainText('Name on Card');
    await expect(page.getByText('Card Number')).toBeVisible();
    await expect(page.locator('#payment-form')).toContainText('Card Number');
    await expect(page.getByText('CVC')).toBeVisible();
    await expect(page.locator('#payment-form')).toContainText('CVC');
    await expect(page.getByText('Expiration')).toBeVisible();
    await expect(page.locator('#payment-form')).toContainText('Expiration');
    await expect(page.getByPlaceholder('ex.')).toBeVisible();
    await expect(page.getByPlaceholder('MM')).toBeVisible();
    await expect(page.getByPlaceholder('YYYY')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Pay and Confirm Order' })).toBeVisible();
    await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
    await page.locator('input[name="name_on_card"]').click();
    await page.locator('input[name="name_on_card"]').fill('gjgjw');
    await page.locator('input[name="card_number"]').click();
    await page.locator('input[name="card_number"]').fill('634726327');
    await page.getByPlaceholder('ex.').click();
    await page.getByPlaceholder('ex.').fill('222');
    await page.getByPlaceholder('MM').click();
    await page.getByPlaceholder('MM').fill('01');
    await page.getByPlaceholder('YYYY').click();
    await page.getByPlaceholder('YYYY').fill('2022');
    //await page.pause();
    await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
    await expect(page.locator("div[class='single-widget'] h2")).toBeVisible()
    //await expect(page.getByText('Order Placed!')).toBeVisible();
    await expect(page.locator("h2[class='title text-center'] b")).toBeVisible()
    await expect(page.locator("h2[class='title text-center'] b")).toContainText('Order Placed!')
    //await expect(page.locator('#form')).toContainText('Order Placed!');
    //await expect(page.getByText('Order Placed!')).toBeVisible();
    await expect(page.locator("div[class='col-sm-9 col-sm-offset-1'] p")).toContainText('Congratulations! Your order has been confirmed!')
    //await expect(page.locator('#form')).toContainText('Congratulations! Your order has been confirmed!');
    //await expect(page.getByRole('link', { name: 'Download Invoice' })).toBeVisible();

    await expect(page.locator("//a[@class='btn btn-default check_out']")).toBeVisible()
    await expect(page.locator("//a[@class='btn btn-default check_out']")).toContainText('Download Invoice')
    // await expect(page.locator('#form')).toContainText('Download Invoice');
    //await expect(page.getByRole('link', { name: 'Continue' })).toBeVisible();
    // await expect(page.locator('#form')).toContainText('Continue');
    await expect(page.locator('div[class="pull-right"] a')).toBeVisible();
    await page.locator('div[class="pull-right"] a').click()
    //await expect(page.locator('a[@class="btn btn-primary"]')).toBeVisible();
    //await expect(page.locator('a[@class="btn btn-primary"]')).toContainText('Continue')
    //await page.locator('a[@class="btn btn-primary"]').click();
    //await page.getByRole('link', { name: 'Continue' }).click();
    await page.locator('div').filter({ hasText: 'Home  Products Cart Logout' }).nth(2).click();
    await expect(page.locator('div').filter({ hasText: 'Home  Products Cart Logout' }).nth(2)).toBeVisible();
});


