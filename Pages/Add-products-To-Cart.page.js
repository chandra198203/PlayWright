import { test, expect } from '@playwright/test'
const products = require('../test-data/Products.json');


exports.AddProductToCart = class AddProductToCart {

    constructor(page) {
        this.page = page

        this.productLink = page.getByRole('link', { name: ' Products' })
        this.productPage = page.getByRole('heading', { name: 'All Products' })
        this.ProductAddedSymbol = page.getByText('')
        this.productAddedText = page.getByText('Your product has been added')
        this.continueShoppingText = page.getByRole('button', { name: 'Continue Shopping' })
        this.viewcart = page.getByRole('link', { name: 'View Cart' })
    }

    async GoToHomePage() {
        await this.page.goto('https://automationexercise.com/');
    }

    async Addproductsfunction() {

        await this.GoToHomePage();
        await expect((this.productLink)).toBeVisible()

        //Handle the dialogs
        await test.step('Click on Products Link and Handle Ads', async () => {
            const linkElement = await this.productLink;
            const Url = await linkElement.evaluate(el => el.href);
            console.log("URL:", Url);
            await this.productLink.click();
            if (this.page.url().includes('google_vignette')) {
                await this.page.goto(Url);
            }

        });

        //Add the items to cart
        await expect(this.productPage).toBeVisible();

        // await this.page.locator("//div[contains(@class,'productinfo text-center')]//p[text()='Blue Top']/following-sibling::a").first().hover()
        // await this.page.locator("//div[contains(@class,'productinfo text-center')]//p[text()='Blue Top']/following-sibling::a").first().click()
        // await expect(this.ProductAddedSymbol).toBeVisible();
        // await expect(this.productAddedText).toBeVisible();
        // await expect(this.continueShoppingText).toBeVisible();
        // await this.continueShoppingText.click();

        // await this.page.locator("//div[contains(@class,'productinfo text-center')]//p[text()='Men Tshirt']/following-sibling::a").first().hover()
        // await this.page.locator("//div[contains(@class,'productinfo text-center')]//p[text()='Men Tshirt']/following-sibling::a").first().click()
        // await expect(this.ProductAddedSymbol).toBeVisible();
        // await expect(this.productAddedText).toBeVisible();
        // await expect(this.viewcart).toBeVisible();
        // await this.viewcart.click()

        const TotalProducts = products.product.length

    for (let counter = 0; counter <TotalProducts ; counter++) {
        let productName = products.product[counter].Productname;
        console.log(productName)
        
        //await page.locator(`//div[contains(@class,"productinfo text-center")]//p[text()="${productName}"]/following-sibling::a`).first().hover()

        await this.page.locator("//div[contains(@class,'productinfo text-center')]//p[text()='"+productName+"']/following-sibling::a").first().hover()
        await this.page.locator("//div[contains(@class,'productinfo text-center')]//p[text()='"+productName+"']/following-sibling::a").first().click()

        //await page.locator("//div[contains(@class,'productinfo text-center')]//p[text()='"+productName+"']/following-sibling::a").first().hover()

        await expect(this.ProductAddedSymbol).toBeVisible();
        await expect(this.productAddedText).toBeVisible();
        await expect(this.continueShoppingText).toBeVisible();
        if (counter < TotalProducts-1) {
            await this.continueShoppingText.click();
        }


    }

    await expect(this.viewcart).toBeVisible();
    await this.viewcart.click();


    }
}
