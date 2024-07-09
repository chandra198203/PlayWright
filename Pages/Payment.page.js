import { test, expect } from '@playwright/test'

exports.Payment = class Payment {

    constructor(page) {
        this.page = page;

        this.PaymentText = page.locator('ol')
        this.PaymentPageHeading = page.getByRole('heading', { name: 'Payment' })
        this.CardNameText = page.getByText('Name on Card')
        this.CardNumberText = page.getByText('Card Number')
        this.CardCVCText = page.getByText('CVC')
        this.CardExpirationText = page.getByText('Expiration')

        this.CardCVCPlaceholderText = page.getByPlaceholder('ex.')
        this.CardMonthPlaceholderText = page.getByPlaceholder('MM')
        this.CardYearPlaceholderText = page.getByPlaceholder('YYYY')
        this.ConfirmPlaceholderText = page.getByRole('button', { name: 'Pay and Confirm Order' })

        this.CardNameInput = page.locator('input[name="name_on_card"]')
        this.CardNumberInput = page.locator('input[name="card_number"]')
        this.CardCVCInput = page.getByPlaceholder('ex.')
        this.CardMMInut = page.getByPlaceholder('MM')
        this.CardYearInput = page.getByPlaceholder('YYYY')

        this.PayandConfirmButton = page.getByRole('button', { name: 'Pay and Confirm Order' })

    }

    async PaymentFunction() {
        //Payment Page
        await expect(this.PaymentText).toContainText('Payment');
        await expect(this.PaymentPageHeading).toBeVisible();
        //await expect(page.locator('#cart_items')).toContainText('Payment');
        await expect(this.CardNameText).toBeVisible();
        //await expect(page.locator('#payment-form')).toContainText('Name on Card');
        await expect(this.CardNumberText).toBeVisible();
        //await expect(page.locator('#payment-form')).toContainText('Card Number');
        await expect(this.CardCVCText).toBeVisible();
        //await expect(page.locator('#payment-form')).toContainText('CVC');
        await expect(this.CardExpirationText).toBeVisible();
        //await expect(page.locator('#payment-form')).toContainText('Expiration');
        await expect(this.CardCVCPlaceholderText).toBeVisible();
        await expect(this.CardMonthPlaceholderText).toBeVisible();
        await expect(this.ConfirmPlaceholderText).toBeVisible();
        await expect(this.PayandConfirmButton).toBeVisible();

        await this.CardNameInput.fill('gjgjw');
        await this.CardNumberInput.fill('634726327');
        await this.CardCVCInput.fill('222');
        await this.CardMMInut.fill('01');
        await this.CardYearInput.fill('2022');
        await this.PayandConfirmButton.click();
    }

}





