import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

    await page.getByText('Proceed To Checkout').click();

    await expect(page.getByRole('link', { name: ' Signup / Login' })).toBeVisible(); // To go to Login page
    await expect(page.getByText('')).toBeVisible();
    await page.getByText('Register / Login account to').click();
    await expect(page.getByRole('link', { name: 'Register / Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue On Cart' })).toBeVisible();
    await page.getByRole('link', { name: 'Register / Login' }).click();
    //await page.getByRole('link', { name: ' Cart' }).click();

    await expect(page.getByRole('link', { name: ' Logout' })).toBeVisible();
    await expect(page.getByText('Shopping Cart')).toBeVisible();
    await expect(page.getByText('Proceed To Checkout')).toBeVisible();





    //*********************************************************************************************************
    

    //*************************************************************************************************************** */
    

    //*************************************************************************************************** */
});