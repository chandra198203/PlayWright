const {test, expect} = require('@playwright/test')

test('TestBuiltInlocators',async({page})=>{

await page.goto('https://demoblaze.com/');

//click on login and verify the Login page is open
await page.getByRole('button',{type :'login2'}).click();
await expect(page.getByText('Username:')).toBeVisible();
//await expect(page.getByLabel('Username:')).toBeVisible();


//Enter the user name

//Enter the Password

//click on login

//Verify the susccesful login

//Close the page

await page.close();

})