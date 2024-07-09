import { test, expect } from '@playwright/test';
const products = require('../test-data/Products.json');

exports.CheckOutPage = class CheckOutPage {

    constructor(page) {
        this.page = page;

        this.checkoutpageText = page.getByText('Checkout')
        this.AddressDetailsHeading = page.getByRole('heading', { name: 'Address Details' })
        this.DeliveryAddressHeading = page.locator('#address_delivery')
        this.DeliveryCustomerName = page.locator("//ul[@id='address_delivery']//li[@class='address_firstname address_lastname']")
        this.DeliveryCustomerAddressLine1 = page.locator("ul[id='address_delivery'] li:nth-child(3)")
        this.DeliveryCustomerAddressLine2 = page.locator("ul[id='address_delivery'] li:nth-child(4)")
        this.DeliveryCustomerAddressLine3 = page.locator("ul[id='address_delivery'] li:nth-child(5)")
        this.DeliveryCustomerCityStatePost = page.locator("ul[id='address_delivery'] li[class='address_city address_state_name address_postcode']")
        this.DeliveryCustomerCountryName = page.locator("ul[id='address_delivery'] li[class='address_country_name']")
        this.DeliveryCustomerPhoneNumber = page.locator("ul[id='address_delivery'] li[class='address_phone']")

        this.InvoiceAddressHeading = page.locator("ul[id='address_invoice'] h3[class='page-subheading']")
        this.InvoiceCustomerName = page.locator("//ul[@class='address alternate_item box'] //li[@class='address_firstname address_lastname']")
        this.InvoiceCustomerAddressLine1 = page.locator("ul[id='address_invoice'] li:nth-child(3)")
        this.InvoiceCustomerAddressLine2 = page.locator("ul[id='address_invoice'] li:nth-child(4)")
        this.InvoiceCustomerAddressLine3 = page.locator("ul[id='address_invoice'] li:nth-child(5)")
        this.InvoiceCustomerCityStatePost = page.locator("ul[id='address_invoice'] li[class='address_city address_state_name address_postcode']")
        this.InvoiceCustomerCountryName = page.locator("ul[id='address_invoice'] li[class='address_country_name']")
        this.InvoiceCustomerPhoneNumber = page.locator("ul[id='address_invoice'] li[class='address_phone']")

        this.OrderReviewHeadingTest = page.getByRole('heading', { name: 'Review Your Order' })
        this.CartItemNameHeading = page.getByRole('cell', { name: 'Item' })
        this.CartItemDescriptionHeading = page.getByRole('cell', { name: 'Description' })
        this.CartItemPriceHeading = page.getByRole('cell', { name: 'Price' })
        this.CartItemQtyHeading = page.getByRole('cell', { name: 'Quantity' })
        this.CartItemTotalCostHeading = page.getByRole('cell', { name: 'Total', exact: true })
        this.CartTotalCostHeading = page.getByText('Total Amount')

        this.checkoutcart = page.locator('table tbody tr')

        this.AdditionalTextHeading = page.locator('label')
        this.AdditionalTextBox = page.locator('textarea[name="message"]')
        this.OrderPlaceButton = page.getByRole('link', { name: 'Place Order' })

    }

    async VerifyBillingAddressFunction() {

       
        await expect(this.checkoutpageText).toBeVisible();
        //await expect(this.AddressDetailsHeading).toBeVisible();
       // await expect(this.DeliveryAddressHeading).toContainText('Your delivery address');
        await expect(this.DeliveryCustomerName).toContainText('Mr. Purnaa chandra')
        await expect(this.DeliveryCustomerAddressLine1).toContainText('EDS')
        await expect(this.DeliveryCustomerAddressLine2).toContainText('11 Tels')
        await expect(this.DeliveryCustomerAddressLine3).toContainText('123')
        await expect(this.DeliveryCustomerCityStatePost).toContainText('mtm ap 123456')
        await expect(this.DeliveryCustomerCountryName).toContainText('India')
        await expect(this.DeliveryCustomerPhoneNumber).toContainText('112233445566')

        
       // await expect(this.InvoiceAddressHeading).toContainText('Your Invoice address');
        await expect(this.InvoiceCustomerName).toContainText('Mr. Purnaa chandra')
        await expect(this.InvoiceCustomerAddressLine1).toContainText('EDS')
        await expect(this.InvoiceCustomerAddressLine2).toContainText('11 Tels')
        await expect(this.InvoiceCustomerAddressLine3).toContainText('123')
        await expect(this.InvoiceCustomerCityStatePost).toContainText('mtm ap 123456')
        await expect(this.InvoiceCustomerCountryName).toContainText('India')


        await expect(this.InvoiceCustomerPhoneNumber).toContainText('112233445566')
    }


    async VerifyTheCartFunction() {
        await expect(this.OrderReviewHeadingTest).toBeVisible();
        await expect(this.CartItemNameHeading).toBeVisible();
        await expect(this.CartItemDescriptionHeading).toBeVisible();
        await expect(this.CartItemPriceHeading).toBeVisible();
        await expect(this.CartItemQtyHeading).toBeVisible();
        await expect(this.CartItemTotalCostHeading).toBeVisible();
        await expect(this.CartTotalCostHeading).toBeVisible();

        const TotalRows1 = await this.checkoutcart.count()
        console.log("total number of rows in the table", TotalRows1);

        // let list_of_products1 = await page.$$("css=td.cart_product")
        // console.log("total number of rows in the table", list_of_products.length);

        // for (let i = 1; i < TotalRows1; i++) {

        //     await expect(this.page.locator(`[id='product-${i}'] > .cart_description`)).toBeVisible();
        //     await expect(this.page.locator(`[id='product-${i}'] > .cart_price`)).toBeVisible();
        //     await expect(this.page.locator(`#product-${i} > .cart_quantity > .disabled`)).toBeVisible();
        //     await expect(this.page.locator(`#product-${i} > .cart_total > .cart_total_price`)).toBeVisible();
        // }

        const TotalProductIDs = products.product.length

        for (let counter = 0; counter <TotalProductIDs ; counter++) {
        
            let productIdCounter = products.product[counter].Id;
            console.log(productIdCounter);
    
            await expect(this.page.locator(`[id='product-${productIdCounter}'] > .cart_description`)).toBeVisible();
            await expect(this.page.locator(`[id='product-${productIdCounter}'] > .cart_price`)).toBeVisible();
            await expect(this.page.locator(`#product-${productIdCounter} > .cart_quantity > .disabled`)).toBeVisible();
            await expect(this.page.locator(`#product-${productIdCounter} > .cart_total > .cart_total_price`)).toBeVisible();
        }

    }

    async PlaceAnOrderFunction() {
        //await expect(page.getByText('If you would like to add a')).toBeVisible();
        await expect(this.AdditionalTextHeading).toContainText('If you would like to add a comment about your order, please write it in the field below.');
        await expect(this.AdditionalTextBox).toBeVisible();
        await expect(this.OrderPlaceButton).toBeVisible();
        await this.OrderPlaceButton.click();
    }

    async CheckoutpageVerification() {
        await this.VerifyBillingAddressFunction();
        await this.VerifyTheCartFunction();
        await this.PlaceAnOrderFunction();
    }


}
