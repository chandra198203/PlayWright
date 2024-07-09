import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await expect(page.getByText('Home  Products Cart Signup')).toBeVisible();
  await page.getByRole('link', { name: ' Contact us' }).click();
  await expect(page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible();
  await page.getByPlaceholder('Name').click();
  await page.locator('.grippy-host').click();
  await page.getByPlaceholder('Name').fill('Purna');
  await page.getByPlaceholder('Email', { exact: true },).fill('purna5@gmail.com');
  await page.getByPlaceholder('Subject').fill('welcome');
  await page.getByPlaceholder('Your Message Here').fill('Please provide the details..');
  await page.locator('//input[@name="upload_file"]').setInputFiles('./test-data/sample.txt');
 
 

  page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.accept();
  });

  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.locator('#contact-page').getByText('Success! Your details have')).toBeVisible();
  //await page.getByRole('link', { name: ' Home' }).click();

  const linkElement = await page.getByRole("link", { name: " Home" });
  console.log(linkElement)
 
  const Url = await linkElement.evaluate(el => el.href);
  console.log(Url)
  
  await linkElement.click();
 
  
  if (page.url().includes('google_vignette') || page.url().includes('contact_us#google_vignette')) {
    await page.goto(Url);
}
  await expect(page.getByRole("link", { name: "Website for automation" })).toBeVisible();

  await expect(page.locator('div').filter({ hasText: 'Home  Products Cart Signup' }).nth(2)).toBeVisible();
});

//***************page.url().includes('google_vignette')|| 