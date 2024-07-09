import { test, expect } from '@playwright/test';

test('test', async ({ page, context }) => {

    //await context.tracing.start({ screenshots: true, snapshots : true });

    await page.goto('https://automationexercise.com/');
    await expect(page.getByRole('link', { name: ' Home' })).toBeVisible();
    await page.getByRole('link', { name: ' Signup / Login' }).click();
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();

    if (page.$('Name')) {
        await page.getByPlaceholder('Name').fill('Purna');
    }
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('purna5@gmail.com');
    await page.getByRole('button', { name: 'Signup' }).click();
    await expect.soft(page.locator('#form')).toContainText('Email Address already exist!');
    //await expect(page.locator('#form')).toHaveText('Email Address already exist!');
    //await expect(page.getByText('Email Address already exist!')).toBeVisible();
    //await expect(page.locator("//p[normalize-space()='Email Address already exist!']")).toBeVisible();

    //await page.pause();
    //await context.tracing.stop({path : 'treace1.zip'});

});