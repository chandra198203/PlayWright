
import {test, expect} from '@playwright/test'

test ('Locators',async({page})=>{

    // Goto the URL
    await page.goto('https://demoblaze.com/index.html');

    //Click on Login using property
    //await page.locator ('id=login2').click()
    await page.click('id=login2');
    

    //Enter the user name using CSS
    await page.fill('#loginusername','Purna');

    //Enter the password
    await page.fill('id=loginpassword','smile')

    //Click on the Login button
    await page.click("//button[@onclick='logIn()']")
    //*[@id="logInModal"]/div/div/div[3]/button[2]

    //Verify the logout option is available after succesful logic
    //await page.isVisible('#logout2');
    //await page.isVisible("//a[@id='logout2']")

    const LogoutUrl= await page.locator("//a[@id='logout2']");
    await expect(LogoutUrl).toBeVisible();

    //Close the page
    await page.close();
})