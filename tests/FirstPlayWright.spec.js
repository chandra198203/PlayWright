const {test, expect} = require('@playwright/test');

test ('Home Page', async ({page})=>{

    await page.goto('https://demoblaze.com/');

    await expect(page).toHaveTitle('STORE');
    await expect(page).toHaveURL('https://demoblaze.com/');

    const PageTitle =await page.title();
    const PageURL= await page.url();

    await console.log('\nTile of page :', PageTitle);
    await console.log('\nUTL of the page:', PageURL);

})


