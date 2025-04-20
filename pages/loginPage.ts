import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    readonly textFieldUsername: Locator;
    readonly textFieldPassword: Locator;
    readonly buttonSignIn: Locator;
    readonly labelProduct: Locator;

    constructor (page: Page){
        this.page = page;
        this.textFieldUsername = page.getByPlaceholder('Username');
        this.textFieldPassword = page.getByPlaceholder('Password');
        this.buttonSignIn = page.locator('#login-button');
        this.labelProduct = page.getByLabel('Products');
    }

    async loginUser(email: string, password: string) {
        await this.textFieldUsername.fill(email);
        await this.textFieldPassword.fill(password);
        expect(await this.buttonSignIn.isEnabled());
        await this.buttonSignIn.click();

        expect(await this.labelProduct.isVisible());
    }

}