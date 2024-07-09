
const { LoginPage } = require('../Pages/Login.page');
import { test, expect } from '@playwright/test';
const myuserdata = require('../test-data/loginData.json');


test('Test Successful Login', async ({ page }) => {

    const Login = new LoginPage(page);

    await test.step('Verify Successful login test with valid User name and Password', async () => {
        await Login.SuccessfullLoginTest(myuserdata.ValidUserName, myuserdata.ValidPassword);              
    });
});

test('Test Failed Login', async ({ page }) => {

    const Login = new LoginPage(page);

    await test.step('Verify login failed test with valid User name or Invalid Password', async () => {
        await Login.UnSuccessfullLoginTest(myuserdata.InValidUserName, myuserdata.InValidPassword);
    });

});