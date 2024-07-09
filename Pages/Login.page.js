import { test, expect } from '@playwright/test';

exports.LoginPage = class LoginPage {

  constructor(page) {

    this.page = page;

    this.homepageLoginLink = page.getByRole('link', { name: ' Signup / Login' })
    this.loginButton = page.getByRole('button', { name: 'Login' })
    this.logInPageHeading = page.getByRole('heading', { name: 'Login to your account' })
    this.enterEmailId = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
    this.enterPassword = page.getByPlaceholder('Password');
    this.loginSuccess = page.getByText('Logged in as Purna')
    this.loginFailed = page.getByText('Your email or password is')

  }

  async GotoHomePage() {
    await this.page.goto('https://automationexercise.com/');
  }

  async GotoLoginPage() {
    await this.homepageLoginLink.click();
    await expect(this.logInPageHeading).toBeVisible();
  }

  async EnterCredentials(UserName, PassWord) {
    await this.enterEmailId.fill(UserName);
    await this.enterPassword.fill(PassWord);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }


  async SuccessfullLoginTest(UserName, PassWord) {
    await this.GotoHomePage();
    await this.GotoLoginPage();
    await this.EnterCredentials(UserName, PassWord);
    await expect(this.loginSuccess).toBeVisible();
  }

  async UnSuccessfullLoginTest(UserName, PassWord) {
    await this.GotoHomePage();
    await this.GotoLoginPage();
    await this.EnterCredentials(UserName, PassWord);
    await expect(this.loginFailed).toBeVisible();

    
  }
}

