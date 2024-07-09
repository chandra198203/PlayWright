import { test, expect } from "@playwright/test";

test("Test Case 6: Contact Us Form", async ({ page }) => {
    await page.goto("https://automationexercise.com/");
    await expect(page.getByRole("link", { name: "Website for automation" })).toBeVisible();
    await page.getByRole("link", { name: " Contact us" }).click();
    await page.getByPlaceholder("Name").click();
    await page.getByPlaceholder("Name").fill("Tester123");
    await page.getByPlaceholder("Name").press("Tab");
    await page.getByPlaceholder("Email", { exact: true }).click();
    await page.getByPlaceholder("Email", { exact: true }).fill("tester123@gmail.com");
    await page.getByPlaceholder("Email", { exact: true }).press("Tab");
    await page.getByPlaceholder("Subject").fill("Test Case 6: Contact Us Form");
    await page.getByPlaceholder("Your Message Here").click();
    await page.getByPlaceholder("Your Message Here").fill("Test Message ");
    await expect(page.locator('//input[@name="upload_file"]')).toBeVisible();
    await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
    await page.locator('//input[@name="upload_file"]').setInputFiles("./test-data/sample.txt");


    page.once("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      if (dialog.message().includes("OK")) {
        dialog.accept();
        console.log("Accepted Dialog");
      } else {
        dialog.dismiss();
        console.log("Dismissed Dialog");
      }
    });

    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.locator("#contact-page").getByText("Success! Your details have")).toBeVisible();
    await expect(page.getByRole("link", { name: " Home" })).toBeVisible();
    
    const linkElement = await page.getByRole("link", { name: " Home" });
    const Url = await linkElement.evaluate(el => el.href);
    
    await linkElement.click();
    
    if (page.url().includes('google_vignette')) {
      await page.goto(Url);
  }
    await expect(page.getByRole("link", { name: "Website for automation" })).toBeVisible();
  });
  