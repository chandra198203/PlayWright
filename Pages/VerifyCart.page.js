import { test, expect } from '@playwright/test'
const { LoginPage } = require('../Pages/Login.page');
const myuserdata = require('../test-data/loginData.json');
const products = require('../test-data/Products.json');


exports.VerifyCartObject = class VerifyCartObject {

    constructor(page) {
        this.page = page;

        this.CartProductCount = this.page.locator('table tbody tr')
        this.proceedToCheckOutButton = this.page.getByText('Proceed To Checkout')
        this.productAddSuccesSymbol = this.page.getByText('')
        this.RegisterLoginLinkUrl = this.page.getByRole('link', { name: 'Register / Login' })
        this.CartLinkOnHomePage = this.page.getByRole('link', { name: ' Cart' })
        this.ProceeedtoCheckOutButton = this.page.getByText('Proceed To Checkout')
    }

    async LoginFunction() {
        const Login = new LoginPage(page);
        await test.step('Login During Purducts Buy', async () => {
            await Login.SuccessfullLoginTest(myuserdata.ValidUserName, myuserdata.ValidPassword);
        });
    }

    async VerifyCartfunction() {

        const TotalRows = await this.CartProductCount.count();
        console.log("total number of rows in the table", TotalRows);

        let list_of_products = await this.page.$$("css=td.cart_product")
        console.log("total number of rows in the table", list_of_products.length);

        const TotalProductIDs = products.product.length

        //await page.pause();
    
        for (let counter = 0; counter <TotalProductIDs ; counter++) {
            
            let productIdCounter = products.product[counter].Id;
            //console.log(productIdCounter);
           
            await expect(this.page.locator(`[id='product-${productIdCounter}'] > .cart_description`)).toBeVisible();
            await expect(this.page.locator(`[id='product-${productIdCounter}'] > .cart_price`)).toBeVisible();
            await expect(this.page.locator(`#product-${productIdCounter} > .cart_quantity > .disabled`)).toBeVisible();
            await expect(this.page.locator(`#product-${productIdCounter} > .cart_total > .cart_total_price`)).toBeVisible();
        }

        await this.proceedToCheckOutButton.click();
        await expect(this.productAddSuccesSymbol).toBeVisible();
        await expect(this.RegisterLoginLinkUrl).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Continue On Cart' })).toBeVisible();
        //await page.getByRole('button', { name: 'Continue On Cart' }).click()
        //const LoginIndicator = await this.RegisterLoginLinkUrl;
        

    }

    async ClickonLoginLink() {
        await this.RegisterLoginLinkUrl.click();
    }

    async InCartProceedToCheckoutFuntion() {
        await expect(this.CartLinkOnHomePage).toBeVisible()
        await this.CartLinkOnHomePage.click();
        await expect(this.ProceeedtoCheckOutButton).toBeVisible();
        await this.ProceeedtoCheckOutButton.click();
    }


}






