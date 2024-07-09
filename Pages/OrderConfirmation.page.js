const { test, expect } = require('@playwright/test')

exports.OrderConfirmation = class Orderconfirmation {

    constructor(page) {
        this.page = page

        this.OrderConfirmationHeading = page.locator("h2[class='title text-center'] b")
        this.OrderConfiramtionText = page.locator("div[class='col-sm-9 col-sm-offset-1'] p")
        this.DownloadInvoiceButton = page.locator("//a[@class='btn btn-default check_out']")
        this.ContinueButton = page.locator('div[class="pull-right"] a')


    }

    async OrderConfirmationPageFunction() {

        await expect(this.OrderConfirmationHeading).toBeVisible()
        await expect(this.OrderConfirmationHeading).toContainText('Order Placed!')
        await expect(this.OrderConfiramtionText).toContainText('Congratulations! Your order has been confirmed!')

        await expect(this.DownloadInvoiceButton).toBeVisible()
        await expect(this.DownloadInvoiceButton).toContainText('Download Invoice')
        await expect(this.ContinueButton).toBeVisible();
        //Click Continue and verify Navigae to HomePage
        //await this.ContinueButton.click()
        //await page.locator('div').filter({ hasText: 'Home  Products Cart Logout' }).nth(2).click();
        //await expect(page.locator('div').filter({ hasText: 'Home  Products Cart Logout' }).nth(2)).toBeVisible();

    }
}



