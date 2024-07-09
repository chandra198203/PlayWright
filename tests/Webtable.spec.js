import { test, expect } from '@playwright/test';

test('WebTable', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    
    const tableColumns = await page.locator("//table[@id='productTable']//thead//tr//th");
    console.log(await tableColumns.allInnerTexts());

    const tableRows = await page.locator("//table[@id='productTable']//tbody//tr");
    console.log(await tableRows);



    await page.locator("//table[@id='productTable']//td[text()='Product 1']/..//INPUT[@type='checkbox']").check();
   

    //console.log(await tableRows.allInnerTexts());
    //await TableRows[2].tableColumns[4].

    // const RowIdentified = tableRows.filter({
    //     has: page.locator('td'),
    //     hasText: 'product 4'

    // })

    // await RowIdentified.locator('input').check()

   await SelectMultipleRows(tableRows,page,'Product 1')
   await SelectMultipleRows(tableRows,page,'Product 2')
   await SelectMultipleRows(tableRows,page,'Product 3')

   //console.log(await RowIdentified.getAttribute())

    await page.waitForTimeout(5000);

});

async function SelectMultipleRows(tableRows,page,value){

        const RowIdentified = tableRows.filter({
                                 has: page.locator('td'),
                                 hasText: value

    })

    await RowIdentified.locator('input').check()

    console.log(await RowIdentified.locator('td').nth(2).allInnerTexts()+" ", await RowIdentified.locator('td').nth(1).allInnerTexts()+" " ,await RowIdentified.locator('td').nth(2).allInnerTexts() )
}