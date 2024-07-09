const {test,expect} =require('@playwright/test')

test.only('Register and login',async({page})=>{

    //test.use({viewport:{width:1900, height:900}})

    //Go to the page
    await page.goto('https://rahulshettyacademy.com/client');


   //click on the register option
    await page.locator('.text-reset').click()

    //verify the Register page is opened ?
    await expect(page.locator('.login-title')).toBeVisible(); 

    const userId='Purna12@gmail.com'
    const password='Smile@369'

    //Enter the Register details
    await page.locator('#firstName').fill('Purna')
    await page.locator('#lastName').fill('chandra')
    await page.locator('#userEmail').fill(userId)
    await page.locator('#userMobile').fill('1122334455')

    const occupation2 = await page.locator("//select[@formcontrolname='occupation']");
    await occupation2.selectOption('2: Student');
 
    await page.locator("//input[@type='radio' and @value='Male']").click();

    await page.locator('#userPassword').fill(password);
    await page.locator('#confirmPassword').fill(password);

    await page.locator('//input[@type="checkbox"]').click();
    await expect(page.locator('//input[@type="checkbox"]')).toBeChecked();

    await page.locator('//input[@type="checkbox"]').check()
    //await page.getByLabel('I am 18 year or Older').click

    await page.locator('#login').click()

    await expect(page.locator('//button[@class="btn btn-primary"]')).toBeVisible()
    await page.locator('//button[@class="btn btn-primary"]').click()

    await page.locator('#userEmail').fill(userId)
    await page.locator('#userPassword').fill(password)
    await page.locator('#login').click()

    //await page.getByLabel("")
    await page.pause();
    

    // Close the page
    //page.close();

})      