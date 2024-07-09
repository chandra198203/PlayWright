import { test } from '@playwright/test';
const myuserdata = require('../test-data/loginData.json');
const { LoginPage } = require('../Pages/Login.page');
const { AddProductToCart } = require('../Pages/Add-products-To-Cart.page');
const { VerifyCartObject } = require('../Pages/VerifyCart.page');
const {CheckOutPage} = require('../Pages/CheckOutPage.page');
const {Payment} = require('../Pages/Payment.page')


test.only('Products Buy and Login during products Buy', async ({ page }) => {

    const Login = new LoginPage(page);
    const AddProducts = new AddProductToCart(page);
    const VerifyCart = new VerifyCartObject(page);
    const CheckOut = new CheckOutPage(page);
    const payment =new Payment(page)

     
    await test.step('Add the products the Cart', async () => {
        await AddProducts.Addproductsfunction();
    
    });

    await test.step('Verify the Cart products', async () => {
        await VerifyCart.VerifyCartfunction();
    });

    await test.step('Click on Login Link', async () => {
        await VerifyCart.ClickonLoginLink();
    });
    

    await test.step('Login to the user', async () => {
        await Login.SuccessfullLoginTest(myuserdata.ValidUserName, myuserdata.ValidPassword);
    });

    await test.step('Proceed to CheckOut', async () => {
        await VerifyCart.InCartProceedToCheckoutFuntion()
    });
    
    //await page.pause();

    await test.step('verify the checkoutpage', async () => {
        await CheckOut.CheckoutpageVerification();
    });

    await test.step('verify the Payment', async () => {
        await payment.PaymentFunction()
    });


});

