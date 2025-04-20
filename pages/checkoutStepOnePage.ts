import { expect, Locator, Page } from '@playwright/test';
export class CheckoutStepOnePage {
    readonly page: Page;

    readonly textFieldFirstName: Locator;
    readonly textFieldLastName: Locator;
    readonly textFieldZipCode: Locator;
    readonly buttonContinue: Locator;

    constructor (page: Page){
        this.page = page;
        this.textFieldFirstName = page.locator('#first-name');
        this.textFieldLastName = page.locator('#last-name');
        this.textFieldZipCode = page.locator('#postal-code');
        this.buttonContinue = page.locator('#continue');
    }

    async continueCheckout() {
        await this.textFieldFirstName.fill('Teelor');
        await this.textFieldLastName.fill('Monde');
        await this.textFieldZipCode.fill('3024');
        await this.buttonContinue.click();
    }

}